// Auto-generated. Do not edit.
declare namespace smartcar {

    /**
     * Read some text from the serial port.
     */
    //% blockId=bt_read block="smartcar|bluetooth read"
    //% blockHidden=1 shim=smartcar::read
    function read(): int32;

    /**
 * Registers code when a delimiter is received
 **/
    //% shim=smartcar::onDelimiterReceived
    function onDelimiterReceived(delimiter: Delimiters, handler: () => void): void;
}

// Auto-generated. Do not edit. Really.