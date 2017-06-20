CC=g++

COMPILE_FLAGS = -g -std=c++11 -Wall -c
LINKER_FLAGS = -g
LIBS = -l bcm2835 -l rt

OBJECTS = \
	test.o \
	ADS1015.o \
	TemperatureSensor.o \
	AccurateTiming.o

#OBJECTS = $(subst .cpp,.o,$(SOURCES))

all: ads.o temp.o timer.o main.o
	$(CC) $(LINKER_FLAGS) -o runner $(OBJECTS) $(LIBS)

main.o: test.cpp
	$(CC) $(COMPILE_FLAGS) test.cpp
ads.o: Libraries/robotois-ADS1015/ADS1015.cpp Libraries/robotois-ADS1015/ADS1015.h
	$(CC) $(COMPILE_FLAGS) Libraries/robotois-ADS1015/ADS1015.cpp
timer.o: Libraries/robotois-timer/AccurateTiming.cpp Libraries/robotois-timer/AccurateTiming.h
	$(CC) $(COMPILE_FLAGS) Libraries/robotois-timer/AccurateTiming.cpp
temp.o: TemperatureSensor.cpp TemperatureSensor.h
	$(CC) $(COMPILE_FLAGS) TemperatureSensor.cpp

clean:
	$(RM) $(OBJECTS) runner
