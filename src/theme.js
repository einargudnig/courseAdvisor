import { createMuiTheme } from '@material-ui/core/styles';
// import primary from '@material-ui/core/colors/blue';
// import secondary from '@material-ui/core/colors/deepPurple';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
      // primary: primary,
      //secondary: secondary,
      primary: { main: '#053f5b'},
      secondary: { main: '#fe3c6f'},
      type: 'light'
      
    }
});