function setUpGoogleSheets() {
    const scriptURL = '<SCRIPT URL>';  // Paste the Google Apps Script URL here
    const form = document.querySelector('#scoutingForm');
    const btn = document.querySelector('#submit');

    form.addEventListener('submit', e => {
        e.preventDefault();
        btn.disabled = true;
        btn.innerHTML = "Sending...";

        let fd = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: fd })  // Removed no-cors to allow response
            .then(response => response.text())  // Read response
            .then(text => { 
                alert('Success! ' + text);
                btn.innerHTML = "Send to Google Sheets";
                btn.disabled = false;
            })
            .catch(error => { 
                alert('Error! ' + error.message);
                btn.innerHTML = "Send to Google Sheets";
                btn.disabled = false;
            });
    });
}

