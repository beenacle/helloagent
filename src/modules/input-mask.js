import IMask from 'imask';

export function inputMask() {
   
    // Input Masks
  const masks = [{
    selector: '#card-number',
    mask: '0000-0000-0000-0000'
  },
  {
    selector: '#card-expiry',
    mask: '00/00'
  },
  {
    selector: '#card-cvv',
    mask: '0000'
  }
];

masks.forEach(({
  selector,
  mask
}) => {
  const element = document.querySelector(selector);
  if (element) {
    IMask(element, {
      mask
    });
  }
});

}
