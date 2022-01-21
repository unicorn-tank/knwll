
import jss from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import { globalViewPortMargin, globalBorderStyle } from './globalStyles';

// '@import': {
//   'url':'https://rsms.me/inter/inter.css'
// },

const baseFontSize = 1.4;

const globalSetupJss = () => {
    jss.setup(preset());
  
    const sheetsRegistry = new SheetsRegistry();
  
      const globalStyleSheet = jss.createStyleSheet(
        { 

          '@global': { 

          body: { 
            backgroundColor: '#fff',
            //fontFamily: 'Arial, Helvetica, sans-serif',
            fontFamily: ['American Typewriter', 'courier'],
            fontWeight: 300,
            fontSize: baseFontSize+'rem',
            margin: globalViewPortMargin,
            boxSizing: 'border-box'
           },
           a: {
            display: 'block',
            padding: [5, 10],
            color: '#000',
            backgroundColor: '#fff',
            border: [4, 'solid', '#000'],
  
              '&:hover' : {
                color: '#fff',
                backgroundColor: '#000',
                border: [4, 'solid', '#000'],
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              '&:focus' : {
                color: '#fff',
                backgroundColor: '#000',
                border: [4, 'solid', '#000'],
              }
           },
           h2: {
  
             color: 'rgba(255,0,0,0.2)'
           },
           input: {
              display: 'block',
              width: '100%',
              border: [4, 'solid', 'black'],
              fontWeight: 600,
              lineHeight: 1.2,
              fontSize: 'inherit',
              padding: [baseFontSize * 0.75 + 'rem', baseFontSize * 0.55 + 'rem'],
              borderRadius: '4px',
              '&:focus' : {
                color: '#fff',
                backgroundColor: '#000'
              }
            },

            button: {
              padding: 10,
              backgroundColor: '#fff',
              border: [4, 'solid', '#000'],
              cursor: 'pointer',
              '.login' : {
                fontSize: '3rem'
              },
              '& :focus' : {
                color: '#fff',
                backgroundColor: '#000'
              }
            }
  
          }
        }, { link: true }
      ).attach();
  
    sheetsRegistry.add(globalStyleSheet);
  
    return sheetsRegistry;
  }

export default globalSetupJss;