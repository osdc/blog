---
title: "Custom Live Ubuntu"
date: 2018-09-14T18:12:36+05:30
---

This BLOG is about making a live CD/DVD from the main system on your hard drive. This is useful if you want to build a clean live CD, or if you want to build a minimal rescue cd. We used it to create a beginner friendly wargame to introduce **Linux** to everyone. The theame was similar to that of [Bandit](http://overthewire.org/wargames/bandit) with very elementary linux commands and only 11 levels.

**If interested can download the .iso from [here](https://drive.google.com/open?id=1AkpUmuFQIl4HccCu2H4BLF3XqLJbffUP) and play**

##### What is a Live CD/DVD? #####

A live CD/DVD (also live disc, or live operating system) is a complete **bootable computer** installation including operating system which runs directly from a CD-ROM or similar storage device into a computer's memory, rather than loading from a hard disk drive. It allows users to run an operating system for any purpose without installing it or making any changes to the computer's configuration. Live CDs can run on a computer without secondary storage, such as a hard disk drive, or with a corrupted hard disk drive or file system, allowing data recovery.

#### Live CD/DVD Structure ####
The directory tree of the live CD/DVD we are going to create is going to look like this: 

```
(CD ROOT) 
|-------+casper 
|       |-------filesystem.${FORMAT}     
|       |-------filesystem.manifest 
|       |-------filesystem.manifest-desktop 
|       |-------vmlinuz |       
|-------initrd.img 
| 
|-------+boot 
|       |--------+grub 
|       |        
|       |        |--------grub.cfg
|       |
|-------memtest86+ 
| 
|--------md5sum.txt 
```

  * /casper/filesystem.${FORMAT}: This is the container of the linux filesystem we are going to copy from our harddisk. It is usually a compressed filesystem like squahsfs.

  * /casper/filesystem.manifest: This file is optional. You only need it if you decide to include the Ubuntu installer in the CD. The purpose of this file will be explained later.

  * /casper/filesystem.manifest-desktop: This file is optional. You only need it if you decide to include the Ubuntu installer in the CD. The purpose of this file will be explained later.

  * /casper/vmlinuz: The linux kernel. This is copied form the linux filesystem.

  * /casper/initrd.img: the initramfs that contain the customizations necessary for the live CD/DVD.

  * /boot/grub/grub.cfg: File containing boot options for the live CD/DVD.

  * /boot/memtest86+: Optional file used to test the RAM of the machine form the live CD/DVD.

  * /md5sum.txt: Optional file containing checksums for all the files in the CD.
  
#### Outline of the Steps ####
  * Prepare our work Environment
  * Copy the source system to the target directory
  * Chroot into the new system and make modifications
  * Prepare the CD directory structure
  * Build the CD/DVD
  
#### Preparing the Environment ####
  * Set some variables

	```
	export WORK=~/work
	export CD=~/cd
	export FORMAT=squashfs
	export FS_DIR=casper
	```
	The WORK Directory is where our temporary files and mount point will reside. The CD is the location of the CD tree. FORMAT is the filesystem type. We you are going to use a compressed squashfs. FS_DIR is the location of the actual filesystem image within the cd tree. 
  * Create the CD and Work Directory Structure

  ```
  sudo mkdir -p ${CD}/{${FS_DIR},boot/grub} ${WORK}/rootfs
  ```
  * Install some packages on current system

  ```
  sudo apt-get update
  sudo apt-get install debootstrap zgrub2 xorriso squashfs-tools qemu  (qemu optional)
  ```
  qemu is (optional). It is only needed for testing the cd before burning it. It can be substituted with any other virtualization software like virtualbox.
  
#### Preparing Your new Filesystem ####

	
	mkdir ${WORK}/rootfs	
	sudo debootstrap --include grub-pc,locales --arch amd64 bionic ${WORK}/rootfs http://archive.ubuntu.com/ubuntu
	
Here, debootstrap will download, extract and install the base system packages to our target directory. Debootstrap only fetches the base system without a kernel or bootloader, so we'll use the --include option to fetch those too. If you need packages not found in the main repository, you can include packages from contrib and non-free with this option --components main,contrib,non-free

`Usage: debootstrap --include <additional_packages,comma-separated> --arch <architecture> <release> <target> <mirror>`

Next we'll enter the chroot environment for a moment to complete the second stage of the install.
	
	sudo chroot ${WORK}/rootfs /bin/bash
	debootstrap --second-stage
	exit
	

##### Preparing the chroot environment #####
Binding the virtual filesystems. Until your new install is booting on it's own, we'll borrow these from the host.
```
mount -o bind /dev /mnt/deboot/dev
mount -o bind /proc /mnt/deboot/proc
mount -o bind /sys /mnt/deboot/sys
```

We also need a working network to install necessary packages

```
sudo cp /etc/resolv.conf ${WORK}/rootfs/etc
```

Now let's enter into the *chroot* system

```
sudo chroot ${WORK}/rootfs /bin/bash
```

Install packages essential for LIVE CD

```
apt-get install casper lupin-casper
```

Now let's give your new install a name. If not, your new install won't have a name, or inherit the name of the host you are installing from and also configure it's locale

```
echo "<name-your-host>" > /etc/hostname
dpkg-reconfigure locales
```

Now let's create a password for root and also add a user and finally **update our system** and exit

```
passwd
adduser <your-user-name>
apt-get update && apt-get upgrade
```
**Now if you want to want to make something similar to the mini-war-game that we made you can refer [this](https://github.com/vaibhavk/wanna-play-linux-meetup-0) link**

#### Prepare the CD directory Structure ####
  * Copy the kernel, the updated initrd and memtest prepared in the chroot:

	  ```
	  export kversion=`cd ${WORK}/rootfs/boot && ls -1 vmlinuz-* | tail -1 | sed 's@vmlinuz-@@'`
	  sudo cp -vp ${WORK}/rootfs/boot/vmlinuz-${kversion} ${CD}/${FS_DIR}/vmlinuz
	  sudo cp -vp ${WORK}/rootfs/boot/initrd.img-${kversion} ${CD}/${FS_DIR}/initrd.img
	  sudo cp -vp ${WORK}/rootfs/boot/memtest86+.bin ${CD}/boot
	  ```

  * Unmount bind mounted dirs:

	  ```
	  sudo umount ${WORK}/rootfs/proc
	  sudo umount ${WORK}/rootfs/sys
	  sudo umount ${WORK}/rootfs/dev
      ```

  * Convert the directory tree into a squashfs: 

	  ```
	  sudo mksquashfs ${WORK}/rootfs ${CD}/${FS_DIR}/filesystem.${FORMAT} -noappend
	  ```
  *Note: Make sure the resulting file size can fit into your live media.*
  * Make filesystem.size 

	  ```
	  echo -n $(sudo du -s --block-size=1 ${WORK}/rootfs | tail -1 | awk '{print $1}') | sudo tee ${CD}/${FS_DIR}/filesystem.size
      ```

  * Calculate MD5 

	  ```
	  find ${CD} -type f -print0 | xargs -0 md5sum | sed "s@${CD}@.@" | grep -v md5sum.txt | sudo tee -a ${CD}/md5sum.txt
	  ```

  * Make Grub the bootloader of the CD Make the grub.cfg 

```
 sudo vim ${CD}/boot/grub/grub.cfg
```
     
Copy the following text into it and save it. 

	  ```
	  set default="0"
	  set timeout=10

	  menuentry "Ubuntu" {
	  linux /casper/vmlinuz boot=casper quiet splash
	  initrd /casper/initrd.img
	  }

	  menuentry "Ubuntu in safe mode" {
	  linux /casper/vmlinuz boot=casper xforcevesa quiet splash
	  initrd /casper/initrd.img
	  }

	  menuentry "Ubuntu CLI" {
	  linux /casper/vmlinuz boot=casper textonly quiet splash
	  initrd /casper/initrd.img
	  }

	  menuentry "Ubuntu GUI from RAM" {
	  linux /casper/vmlinuz boot=casper toram quiet splash
	  initrd /casper/initrd.img
	  }

	  menuentry "Check Disk for Defects" {
	  linux /casper/vmlinuz boot=casper integrity-check quiet splash
	  initrd /casper/initrd.img
	  }

	  menuentry "Memory Test" {
	  linux16 /boot/memtest86+.bin
	  }

	  menuentry "Boot from the first hard disk" {
	  set root=(hd0)
	  chainloader +1
	  }
	  ```

#### Build the LIVE CD ####
Make the .iso file

```
	sudo grub-mkrescue -o ~/live-cd.iso ${CD}
```

Now it's ready to be made bootable from any device.
