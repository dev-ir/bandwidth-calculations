function calculateDownload(speedGbps, days) {
    const speedBytesPerSecond = (speedGbps * 1e9) / 8;
    const secondsPerDay = 86400;
    const bytesPerDay = speedBytesPerSecond * secondsPerDay;
    const totalBytes = bytesPerDay * days;
    const totalTerabytes = totalBytes / 1e12;
    return Math.round(totalTerabytes);
}

function calculateSpeed(dataTB, days) {
    const totalBytes = dataTB * 1e12;
    const secondsPerDay = 86400;
    const totalSeconds = days * secondsPerDay;
    const speedBytesPerSecond = totalBytes / totalSeconds;
    const speedGbps = (speedBytesPerSecond * 8) / 1e9;
    return speedGbps;
}

function formatSpeed(speedGbps) {
    if (speedGbps >= 1) {
        return `${speedGbps.toFixed(2)} گیگابیت بر ثانیه`;
    } else {
        const speedMbps = speedGbps * 1000;
        return `${speedMbps.toFixed(2)} مگابیت بر ثانیه`;
    }
}

document.getElementById('downloadForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const speed = parseFloat(document.getElementById('speed').value);
    const days = parseInt(document.getElementById('days').value, 10);
    const result = calculateDownload(speed, days);
    document.getElementById('result').textContent = `در ${days} روز با سرعت ${speed} گیگابیت بر ثانیه، شما می‌توانید تقریبا ${result} ترابایت داده دانلود کنید.`;
});

document.getElementById('speedForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const data = parseFloat(document.getElementById('data').value);
    const days = parseInt(document.getElementById('daysForSpeed').value, 10);
    const resultSpeedGbps = calculateSpeed(data, days);
    const formattedSpeed = formatSpeed(resultSpeedGbps);
    document.getElementById('result').textContent = `برای دانلود ${data} ترابایت داده در ${days} روز، شما نیاز به پهنای باند ${formattedSpeed} دارید.`;
});

document.getElementById('switchToSpeedForm').addEventListener('click', function () {
    document.getElementById('form-container').classList.add('d-none');
    document.getElementById('speedFormContainer').classList.remove('d-none');
});

document.getElementById('switchToDownloadForm').addEventListener('click', function () {
    document.getElementById('speedFormContainer').classList.add('d-none');
    document.getElementById('form-container').classList.remove('d-none');
});