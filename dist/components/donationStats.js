import { createTag } from '../utils/tagEl.js';
const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
    '#EC7063',
    '#5DADE2',
    '#AF7AC5',
    '#48C9B0',
    '#F5B041',
    '#DC7633',
    '#A569BD',
    '#5499C7',
    '#58D68D',
    '#F4D03F',
    '#EB984E',
    '#73C6B6',
    '#7FB3D5',
    '#C39BD3',
    '#76D7C4',
    '#F1948A',
    '#AED6F1',
    '#F9E79F',
    '#A3E4D7',
    '#D7BDE2',
];
const donationContainer = document.querySelector('.donation-stats');
const imageCache = {};
export function drawFavDonations(accumulatedDonations) {
    if (donationContainer)
        donationContainer.innerHTML = '';
    for (const donation of accumulatedDonations) {
        const item = createTag('li', ['animal-stats']);
        item.insertAdjacentHTML('afterbegin', `<div class="fav-animal">
                <img src="../../assets/images/animal-info/about-${donation.petId}.jpg" alt="${donation.commonName}">
                <div class="fav-name">${donation.petName}</div>
                <div class="like filled"></div>
            </div>
            <div class="donation-track">
              <div class="relative-track">
               <span class="donation-amount">${donation.totalDonation}$</span>
              </div>
            </div>`);
        const track = item.querySelector('.relative-track');
        setTimeout(() => {
            if (track && donation.share)
                track.style.width = `${donation.share}%`;
        }, 1000);
        donationContainer === null || donationContainer === void 0 ? void 0 : donationContainer.append(item);
    }
}
export function drawOtherDonations(accumulatedDonations) {
    const donationContainer = document.querySelector('.other-donation-list');
    if (donationContainer)
        donationContainer.innerHTML = '';
    for (const donation of accumulatedDonations) {
        const item = createTag('li', ['other-donation-item']);
        item.insertAdjacentHTML('afterbegin', `
              <div class="animal-logo">
                <img src="../../assets/images/animal-info/about-${donation.petId}.jpg" alt="${donation.commonName}">
              </div>
              <div class="fav-name">${donation.petName}</div>
              <div class="donation-amount">${donation.totalDonation}$</div>
          `);
        donationContainer === null || donationContainer === void 0 ? void 0 : donationContainer.append(item);
    }
}
export function drawBarDonations(accumulatedDonations, topDonation) {
    if (donationContainer)
        donationContainer.innerHTML = '';
    const dpr = window.devicePixelRatio;
    const { canvas, canvasWidth, canvasHeight } = setupCanvas(dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.scale(dpr, dpr);
    const redraw = () => {
        drawBarDonations(accumulatedDonations, topDonation);
    };
    drawAxis(ctx, accumulatedDonations, topDonation, canvasWidth, canvasHeight, redraw);
}
export function drawPieDonations(accumulatedDonations, allDonations) {
    var _a, _b;
    if (donationContainer)
        donationContainer.innerHTML = '';
    const dpr = window.devicePixelRatio;
    const { canvas } = setupCanvas(dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    let sectorLast = -Math.PI / 2;
    let legendCurrItemStart = 30;
    const legendX = canvas.width * 0.8;
    const chartSize = window.innerWidth < 700 ? 200 : 400;
    for (let i = 0; i < accumulatedDonations.length; i++) {
        //draw pie sector
        const color = colors[i] || 'lightgrey';
        const donation = accumulatedDonations[i];
        if (!donation)
            return;
        const currShare = (_a = donation.share) !== null && _a !== void 0 ? _a : 0;
        const chartCenterX = (canvas.width * 0.8) / 2;
        const chartCenterY = canvas.height / 2;
        const start = sectorLast;
        const angle = convertShareToRad(currShare);
        const end = start + angle;
        sectorLast = end;
        drawSector(ctx, chartCenterX, chartCenterY, chartSize, start, end, color);
        //draw legend
        ctx.fillStyle = color;
        const legendSize = window.innerWidth < 700 ? 20 : 30;
        const legendGap = 10;
        ctx.fillRect(legendX, legendCurrItemStart, legendSize, legendSize);
        // add legend text
        ctx.fillStyle = 'darkgrey';
        ctx.font = `${legendSize}px Montserrat`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText(donation.petName || '', legendX + legendSize * 2, legendCurrItemStart);
        legendCurrItemStart += legendSize + legendGap;
    }
    sectorLast = -Math.PI / 2;
    for (let i = 0; i < accumulatedDonations.length; i++) {
        const donation = accumulatedDonations[i];
        if (!donation)
            return;
        const currShare = (_b = donation.share) !== null && _b !== void 0 ? _b : 0;
        const chartCenterX = (canvas.width * 0.8) / 2;
        const chartCenterY = canvas.height / 2;
        const start = sectorLast;
        const angle = convertShareToRad(currShare);
        const end = start + angle;
        const textAngle = sectorLast + angle / 2;
        sectorLast = end;
        //draw values
        const rText = (1.4 * chartSize) / 2;
        const textX = chartCenterX + rText * Math.cos(textAngle);
        const textY = chartCenterY + rText * Math.sin(textAngle);
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        if (donation.share)
            ctx.fillText(`${donation.share}%`, textX, textY);
    }
    ctx.fillStyle = 'lightgrey';
    ctx.textAlign = 'left';
    ctx.fillText(`TOTAL: ${allDonations}$`, legendX, legendCurrItemStart + 40);
}
function setupCanvas(dpr) {
    const canvas = createTag('canvas');
    canvas.id = 'chartCanvas';
    donationContainer === null || donationContainer === void 0 ? void 0 : donationContainer.append(canvas);
    const canvasRect = canvas.getBoundingClientRect();
    canvas.width = canvasRect.width * dpr;
    canvas.height = canvasRect.height * dpr;
    return { canvas: canvas, canvasWidth: canvasRect.width, canvasHeight: canvasRect.height };
}
function drawAxis(ctx, animalDonates, topDonation, canvasWidth, canvasHeight, redraw) {
    const bottomPadding = 80;
    const sidePadding = 30;
    const topPadding = 10;
    const bottomAxisY = canvasHeight - bottomPadding;
    drawLine(ctx, [sidePadding, topPadding], [sidePadding, bottomAxisY], 'lightgray');
    drawLine(ctx, [sidePadding, bottomAxisY], [canvasWidth - sidePadding, bottomAxisY], 'lightgray');
    const xAxisLength = canvasWidth - sidePadding * 2;
    const yAxisLength = canvasHeight - bottomPadding - topPadding;
    //draw Y axis with values
    const step = yAxisLength / 10;
    const yValueFraction = Math.ceil(topDonation / 10);
    const yPositionFraction = yAxisLength / 10;
    for (let i = 0; i <= 10; i++) {
        const y = bottomAxisY - i * step;
        drawCircle(ctx, [sidePadding, y], 3, 'lightgray');
        const value = i * yValueFraction + '$';
        drawYAxisValues(ctx, value, sidePadding / 3, y, 'lightgray');
    }
    // draw bars with text below
    const barSpace = xAxisLength / animalDonates.length;
    const barWidth = barSpace * 0.5;
    const barTextY = yAxisLength + topPadding + 20;
    for (let i = 0; i < animalDonates.length; i += 1) {
        const item = animalDonates[i];
        if (!item || item.share === undefined)
            continue;
        const x = (i + 1) * barSpace - (barSpace + barWidth) / 2 + sidePadding;
        const height = (yAxisLength * item.share) / 100;
        const y = yAxisLength + topPadding - height;
        drawBar(ctx, [x, y], [barWidth, height], '#f58021');
        const currDonation = animalDonates[i];
        if (!(currDonation === null || currDonation === void 0 ? void 0 : currDonation.petName))
            continue;
        const textX = (i + 1) * barSpace - barSpace / 2 + sidePadding;
        drawBarData(ctx, currDonation === null || currDonation === void 0 ? void 0 : currDonation.petName, currDonation === null || currDonation === void 0 ? void 0 : currDonation.petId, textX, barTextY, 'gray', redraw);
    }
}
function drawLine(ctx, start, end, color) {
    if (!start[0] === undefined || !start[1] === undefined || !end[0] === undefined || !end[1] === undefined)
        return;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.closePath();
    ctx.stroke();
}
function drawCircle(ctx, coord, radius, color) {
    if (!coord[0] || !coord[1])
        return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(coord[0], coord[1], radius, 0, Math.PI * 2, true);
    ctx.fill();
}
function drawBar(ctx, coord, size, color) {
    if (!coord[0] || !coord[1] || !size[0] || !size[1])
        return;
    ctx.fillStyle = color;
    ctx.fillRect(coord[0], coord[1], size[0], size[1]);
}
function drawYAxisValues(ctx, text, x, y, color) {
    ctx.font = '10px Montserrat';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}
function drawBarData(ctx, text, petId, x, y, color, redraw, angle = 45) {
    ctx.save();
    ctx.translate(x, y);
    if (document.documentElement.clientWidth >= 1200) {
        const img = getPetImg(petId, redraw);
        if (img.complete) {
            drawPetPic(ctx, img, 0, 20);
        }
    }
    else {
        ctx.rotate((-angle * Math.PI) / 180);
        ctx.font = '10px Montserrat';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
    }
    ctx.restore();
}
function drawPetPic(ctx, img, x, y) {
    const radius = 30;
    if (!img)
        return;
    const size = Math.min(img.width, img.height);
    const sx = (img.width - size) / 2;
    const sy = (img.height - size) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, sx, sy, size, size, x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
}
function getPetImg(petId, onLoad) {
    if (!imageCache[petId]) {
        const img = new Image();
        img.src = `../../assets/images/animal-info/about-${petId}.jpg`;
        img.onload = () => {
            onLoad();
        };
        imageCache[petId] = img;
    }
    return imageCache[petId];
}
function drawSector(ctx, x, y, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
function convertShareToRad(share) {
    const angle = 360 * (share / 100);
    return angle * (Math.PI / 180);
}
//# sourceMappingURL=donationStats.js.map