import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#041526',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MatchResults = ({ openModal, closeModal, matchingAnimeName, matchingAnimeImage }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p>{matchingAnimeName}</p>
            <img src={matchingAnimeImage} alt={matchingAnimeName} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

MatchResults.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  matchingAnimeName: PropTypes.string,
  matchingAnimeImage: PropTypes.string,
};

export default MatchResults;
