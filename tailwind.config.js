module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#0D0807',
      green:"#2BAC76",
      blue:{
        light:"#0096D7",
        flowkit:"#0099FF"
      },
      red:{
        main :"#BF5467",
        secondary :"#CD2553"
      },
      gray:{
        50 : "#D9D9D9",
        90 : "#A6A6A6",
        100 :"#555555",
      },
      brown:{
        40: "#262121",
        50 : "#342E2E",
        80 : "#373131",
        90 : "#423A3A",
        100 :"#453F3F",
        110:"#524848"
      },
    },
    borderWidth:{
      "1":"1px",
      "2":"2px",
    },
    fontSize: {
      '10': '10px',
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '24': '24px',
      '28': '28px',
      '32': '32px',
      '36': '36px',
      '40': '40px',
      '48': '48px',
      '56': "56px",
      '64': '64px',
    },
    borderRadius: {
      'none': '0',
      "8" : "8px",
      "10" : "10px",
      "12" : "12px",
      "16" : "16px",
      "20" : "20px",
      "30" : "30px",
      "full":"100%",
    },
  },

  plugins: [],
}
