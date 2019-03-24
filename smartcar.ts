/*
Copyright (C): 2019, Robobyt
*/

declare namespace pins {
    //% fixedInstance shim=pxt::getPin(PB_3)
    const SCK: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PB_4)
    const MISO: AnalogPin;
    //% fixedInstance shim=pxt::getPin(PB_5)
    const MOSI: AnalogPin;
}

//% color="#DF7401" weight=20 icon="\uf1b9"
namespace smartcar {

    export enum CarState {
        //% blockId="Car_Run" block="Run"
        Car_Run = 1,
        //% blockId="Car_Back" block="Back"
        Car_Back = 2,
        //% blockId="Car_Left" block="Left"
        Car_Left = 3,
        //% blockId="Car_Right" block="Right"
        Car_Right = 4,
        //% blockId="Car_Stop" block="Stop"
        Car_Stop = 5,
    }

    function Car_Stop() {
        pins.SCL.digitalWrite(false);
        pins.SDA.digitalWrite(false);
        pins.MISO.digitalWrite(false);
        pins.MOSI.digitalWrite(false);
    }

    function Car_Back() {
        pins.SCL.digitalWrite(false);
        pins.SDA.digitalWrite(true);
        pins.MISO.digitalWrite(false);
        pins.MOSI.digitalWrite(true);
    }

    function Car_Run() {
        pins.SCL.digitalWrite(true);
        pins.SDA.digitalWrite(false);
        pins.MISO.digitalWrite(true);
        pins.MOSI.digitalWrite(false);
    }

    function Car_Right() {
        pins.SCL.digitalWrite(true);
        pins.SDA.digitalWrite(false);
        pins.MISO.digitalWrite(false);
        pins.MOSI.digitalWrite(true);
    }

    function Car_Left() {
        pins.SCL.digitalWrite(false);
        pins.SDA.digitalWrite(true);
        pins.MISO.digitalWrite(true);
        pins.MOSI.digitalWrite(false);
    }

    //% blockId=CarControl block="CarControl|%index"
    //% weight=92
    //% blockGap=10
    //% group="Car control"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarControl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_Run(); break;
            case CarState.Car_Back: Car_Back(); break;
            case CarState.Car_Left: Car_Left(); break;
            case CarState.Car_Right: Car_Right(); break;
            case CarState.Car_Stop: Car_Stop(); break;
        }
    }

    //% blockId=ultrasonic_car block="ultrasonic return distance(cm)"
    //% weight=98
    //% blockGap=10
    //% group="Ultrasonic Sensor"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Sensor(maxCmDistance = 500): number {
        // send pulse
        pins.SCK.setPull(PinPullMode.PullNone);
        pins.SCK.digitalWrite(false);
        control.waitMicros(2);
        pins.SCK.digitalWrite(true);
        control.waitMicros(10);
        pins.SCK.digitalWrite(false);
        pins.CS.setPull(PinPullMode.PullUp);

        // read pulse
        let d = pins.CS.pulseIn(PulseValue.High, maxCmDistance * 42);
        console.log("Distance: " + d / 42);

        basic.pause(50);

        return d / 42;
    }

    //% group="Bluetooth"
    //% blockId=bt_ondelimiter block="bluetooth on symbol $delimiter received"
    export function onCommandReceived(delimiter: Delimiters, handler: () => void) {
        onDelimiterReceived(delimiter, handler);
    }

    //% group="Bluetooth"
    //% blockId=bt_read block="smartcar|bluetooth read"
    export function readCharacter(): number {
        return read();
    }

}
