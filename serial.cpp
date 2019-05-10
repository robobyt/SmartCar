#include "pxt.h"
#include "MbedSerial.h"

enum class BaudRate {
  //% block=115200
  BaudRate115200 = 115200,
  //% block=57600
  BaudRate57600 = 57600,
  //% block=38400
  BaudRate38400 = 38400,
  //% block=31250
  BaudRate31250 = 31250,
  //% block=28800
  BaudRate28800 = 28800,
  //% block=19200
  BaudRate19200 = 19200,
  //% block=14400
  BaudRate14400 = 14400,
  //% block=9600
  BaudRate9600 = 9600,
  //% block=4800
  BaudRate4800 = 4800,
  //% block=2400
  BaudRate2400 = 2400,
  //% block=1200
  BaudRate1200 = 1200,
  //% block=300
  BaudRate300 = 300
};

enum class Delimiters {
    //% block="new line"
    NewLine = 10, //'\n',
    //% block=","
    Comma = 44, //',',
    //% block="$"
    Dollar = 36, // '$',
    //% block=":"
    Colon = 58, // ':',
    //% block="."
    Fullstop = 46, //'.',
    //% block="#"
    Hash = 35, //'#',
    //% block=";"
    SemiColumn = 59,
    //% block="space",
    Space = 32,
    //% block="tab"
    Tab = 9, //'\t'
    //% block="pipe"
    Pipe = 124 // `|`,

};


namespace smartcar {
	
	class WSerial {
    public:
      CODAL_SERIAL serial;
      WSerial()
        : serial(PIN(TX), PIN(RX))
        {
          serial.baud((int)BaudRate::BaudRate115200);
        }
  };

   SINGLETON(WSerial);

    //% 
    int read() {
      return getWSerial()->serial.read(codal::SerialMode::ASYNC);
   }

    //% 
    void onDelimiterReceived(Delimiters delimiter, Action handler) {
        getWSerial()->serial.read(codal::SerialMode::ASYNC);
        registerWithDal(DEVICE_ID_SERIAL, CODAL_SERIAL_EVT_DELIM_MATCH, handler);
        ManagedString d((char)delimiter);
        getWSerial()->serial.eventOn(d);
    }

}
