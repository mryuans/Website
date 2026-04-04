---
title: lec5
displayTitle: lec5
---
 
在不同编辑器中尝试调用openssl中的md5函数：
::tab
# Code pieces 1:
```c
#include <openssl/md5.h>
#pragma comment(lib, "libeay32.lib")
#pragma comment(lib, "ssleay32.lib")
main()
{
   int i;
   unsigned char s[100]="Hello", t[100];
   MD5(s, strlen(s), t);
	for(i=0; i<16; i++)
		printf("%02X ", t[i]);
}
```
::


