window.addEventListener('load', async () => {
  const scanResult = document.getElementById('scanResult');
  const lastResult = document.getElementById('lastResult');

  try {
    if (navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const webcamStream = document.getElementById('webcamStream');
      webcamStream.srcObject = stream;

      const codeReader = new ZXingBrowser.BrowserMultiFormatReader();
      codeReader.decodeFromVideoElement(webcamStream, (result, error, controls) => {
        scanResult.classList.remove('success');
        if (!scanResult.classList.contains('success')) {
          scanResult.textContent = 'Scanning ...';
        }
        scanResult.classList.toggle('active');
        if (result) {
          lastResult.textContent = result.text;
          scanResult.classList.toggle('success');
        }
        if (error) {
          console.log(error);
        }
      }); 
    }
  } catch (error) {
    console.log(error);
    scanResult.textContent = 'Something went wrong. Please refresh the page and try again.';
    scanResult.classList.remove(['success', 'active']);
    scanResult.classList.add('failure');
  }
});

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));