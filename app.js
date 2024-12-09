document.getElementById('connectButton').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    // Request device
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'], // Change based on your device
    });

    status.textContent = `Device selected: ${device.name}`;

    // Connect to GATT server
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('battery_service');
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();
    const batteryLevel = value.getUint8(0);

    status.textContent += ` - Battery Level: ${batteryLevel}%`;
  } catch (error) {
    console.error(error);
    status.textContent = `Error: ${error.message}`;
  }
});
