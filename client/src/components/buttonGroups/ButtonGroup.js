import PropTypes from 'prop-types';
import EditDelete from './EditDelete';
import CancelSave from './CancelSave';

const ButtonGroup = ({
  onEdit, cancel, save, edit, del,
}) => (
  onEdit ? (
    <CancelSave
      cancel={cancel}
      save={save}
    />
  ) : (
    <EditDelete
      edit={edit}
      del={del}
    />
  )
);

ButtonGroup.propTypes = {
  onEdit: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default ButtonGroup;
