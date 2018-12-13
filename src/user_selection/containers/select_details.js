import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NavBar from '../../components/navbar';
import SelectionStepper from '../components/stepper.js';
import PlaylistLoad from '../components/load';
import Playlist from '../../playlist/containers/playlist';
import { connect } from 'react-redux';
import { onDialogOpen,
         onDialogClose,
         handleGenreSelection,
         handleDanceabilitySelection,
         handleEnergySelection,
         handleKeySelection,
         handleLoudnessSelection,
         handleModeSelection,
         handleTempoSelection,
         handlePositivenessSelection,
         handleSelectionSubmit
       } from '../../actions/selection_actions/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '720px',
    backgroundColor: 'black'
  },
  navBarHolder: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  },
  containerGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black',
  },
  welcomeGrid: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    marginTop: '7%',
  },
  typographyOne: {
    fontFamily: 'Montserrat',
    fontSize: '70px',
    fontWeight: '800',
    color: '#c5c5c5'
  },
  typographyTwo: {
    fontFamily: 'Montserrat',
    fontSize: '20px',
    color: '#c5c5c5'
  },
  stepperGrid: {
    width: '30%',
    marginTop: '3%',
    marginBottom: '3%'
  }
});

class Select extends React.Component {
  render() {
    const { classes } = this.props;

    let body;
    if (!this.props.loading) {
      body =
      <Grid className={classes.welcomeGrid} item>
        <p className={classes.typographyOne}>
          Diversify Your Sound
        </p>
        <p className={classes.typographyTwo}>
          Make your choices in the following 10 steps to specify the tune you love.
        </p>
        <p className={classes.typographyTwo}>
          We will then curate a playlist that will surprise your ears.
        </p>


      <Grid className={classes.stepperGrid} item>
        <SelectionStepper
          handleDialogOpen={() => {this.props.dispatch(onDialogOpen())}}
          handleDialogClose={() => {this.props.dispatch(onDialogClose())}}
          handleGenreSelection={(value) => {this.props.dispatch(handleGenreSelection(value))}}
          handleDanceabilitySelection={(value) => {this.props.dispatch(handleDanceabilitySelection(value))}}
          handleEnergySelection={(value) => {this.props.dispatch(handleEnergySelection(value))}}
          handleKeySelection={(value) => {this.props.dispatch(handleKeySelection(value))}}
          handleLoudnessSelection={(value) => {this.props.dispatch(handleLoudnessSelection(value))}}
          handleModeSelection={(value) => {this.props.dispatch(handleModeSelection(value))}}
          handleTempoSelection={(value) => {this.props.dispatch(handleTempoSelection(value))}}
          handlePositivenessSelection={(value) => {this.props.dispatch(handlePositivenessSelection(value))}}
          handleSelectionSubmit={(token) => {this.props.dispatch(handleSelectionSubmit(token))}}
          activeStep={this.props.activeStep}
          dialogOpen={this.props.dialogOpen}
          genreTitle={this.props.genreTitle}
          genre={this.props.genre}
          danceability={this.props.danceability}
          danceabilityTitle={this.props.danceabilityTitle}
          energy={this.props.energy}
          energyTitle={this.props.energyTitle}
          key={this.props.key}
          keyTitle={this.props.keyTitle}
          loudness={this.props.loudness}
          loudnessTitle={this.props.loudnessTitle}
          mode={this.props.mode}
          modeTitle={this.props.modeTitle}
          tempo={this.props.tempo}
          tempoTitle={this.props.tempoTitle}
          positiveness={this.props.valence}
          positivenessTitle={this.props.valenceTitle}
        />
      </Grid>
      </Grid>
  };

  if (this.props.loading) {
    body =
      <Grid className={classes.stepperGrid} item>
        <PlaylistLoad
          title={this.props.loading_title}
          content={this.props.loading_content} />
      </Grid>
  };

  if (this.props.playlist_failure) {
    body =
      <PlaylistLoad
        title={this.props.failure_title}
        content={this.props.failure_content}
      />
  };

  if (this.props.success) {
    body =
    <Playlist tracks={this.props.spotifyData.tracks} />
  };

    return (
      <div className={classes.root}>
        <Grid className={classes.containerGrid} container>
          <Grid className={classes.navBarHolder} item xs={12}>
            <NavBar pageOne="/about" textOne="About" pageTwo="/contact" textTwo="Contact" />
          </Grid>
          {body}
        </Grid>
      </div>
    );
  };
};

const mapStateToProps = state => {
  state = state.SelectionReducer;
  return {
    activeStep: state.select.activeStep,
    dialogOpen: state.select.dialogOpen,
    genre: state.user_selection.genre,
    genreTitle: state.titles.genre,
    danceability: state.user_selection.danceability,
    danceabilityTitle: state.titles.danceability,
    energy: state.user_selection.energy,
    energyTitle: state.titles.energy,
    key: state.user_selection.key,
    keyTitle: state.titles.key,
    loudness: state.user_selection.loudness,
    loudnessTitle: state.titles.loudness,
    mode: state.user_selection.mode,
    modeTitle: state.titles.mode,
    tempo: state.user_selection.tempo,
    tempoTitle: state.titles.tempo,
    positiveness: state.user_selection.valence,
    positivenessTitle: state.titles.valence,
    submitted: state.submitted,
    loading: state.loading_playlist,
    loading_title: state.loading_playlist_content.title,
    loading_content: state.loading_playlist_content.content,
    failure: state.playlist_failure,
    failure_title: state.playlist_failure_content.title,
    failure_content: state.playlist_failure_content.content,
    success: state.playlist_success,
    spotifyData: state.spotifyData
  };
};

Select.propTypes = {
  classes: PropTypes.object.isRequired,
};

const withstyles = withStyles(styles)(Select);
const selectConnected = connect(mapStateToProps)(withstyles);
export default selectConnected;
