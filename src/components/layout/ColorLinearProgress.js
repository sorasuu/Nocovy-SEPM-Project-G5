import { withStyles ,LinearProgress, lighten} from '@material-ui/core';
 const ColorLinearProgress = withStyles({
    colorPrimary: {
      background: lighten("#ff8e53",0.4)
    },
    barColorPrimary: {
      background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
    }
  })(LinearProgress);
export default ColorLinearProgress