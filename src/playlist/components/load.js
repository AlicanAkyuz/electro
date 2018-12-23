import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const afterformStyle = afterformStyle => ({
  container: {
    display: 'grid',
    height: 'auto',
    minHeight: '100vh',
    gridTemplateRows: '15% 20% 5% 10% 10% 10% 5% 10% 5%',
    gridTemplateColumns: '5% 10% 15% 20% 20% 15% 10% 5%',
    backgroundColor: '#0c0c0c'
  },
  headerItem: {
    gridRow: '2 / span 1',
    gridColumn: '3 / span 4',
    placeSelf: 'center'
  },
  subtextItem: {
    gridRow: '4 / span 1',
    gridColumn: '4 / span 2',
    placeSelf: 'center'
  },
  circleItem: {
    gridRow: '6 / span 1',
    gridColumn: '4 / span 2',
    placeSelf: 'center'
  },
  buttonItem: {
    gridRow: '8 / span 1',
    gridColumn: '4 / span 2',
    placeSelf: 'center'
  },
  textHeader: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: '5vmax',
    fontWeight: '800',
    color: '#4A7023',
  },
  textContent: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '2vmax',
    fontWeight: '400',
    color: '#C1CDC1',
  },
  button: {
    height: '3.8em',
    width: '12em',
    backgroundColor: '#00611C',
    borderRadius: '7px',
    border: 'none',
    '&:hover': {
      backgroundColor: "#4A7023",
    },
  },
  links: {
    fontFamily: 'Montserrat',
    fontSize: '1.3vmax',
    fontWeight: '800',
    textDecoration: 'none',
    textTransform: 'none',
    color: '#C1CDC1',
  },
  progress: {
    color: '#00611C',
  },
});

function Load(props) {
  const { classes } = props;

  let showCircle;
  if (props.failure !== "failure") {
    showCircle = <CircularProgress className={classes.progress} size={60} thickness={3} />
  }

  let showButton;
  if (props.failure) {
    showButton =
    <div class="animated flip">
      <button onClick={props.onReset} className={classes.button} size="large" variant="contained">
        <Link className={classes.links} to="/">TRY AGAIN!</Link>
      </button>
    </div>

  };

  return (
    <div className={classes.container}>
      <div className={classes.headerItem}><p className={classes.textHeader}>{props.title}</p></div>
      <div className={classes.subtextItem}><p className={classes.textContent}>{props.content}</p></div>
      <div className={classes.circleItem}>{showCircle}</div>
      <div className={classes.buttonItem}>{showButton}</div>
    </div>
  )
}

Load.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(afterformStyle)(Load);
