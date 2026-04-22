CFLAG = -Wall -g `pkg-config -cflags openssl`
LIBS = `pkg-config --libs openssl`
md5_sbox: md5_sbox.c
	$(CC) $(CFLAG) -o md5_sbox md5_sbox.c $(LIBS)
