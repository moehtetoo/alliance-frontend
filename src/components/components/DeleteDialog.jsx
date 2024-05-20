import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import PropTypes from 'prop-types';

const DeleteDialog = ({open, handleOpen, projectName}) => {


    return (
        <Dialog
            open={open}
            size="xs"
            handler={handleOpen}
        >
            <DialogHeader>Delete Project</DialogHeader>
            <DialogBody>
                Are you sure want to delete this project: {projectName}?
            </DialogBody>
            <DialogFooter>
            <Button
                variant="text"
                onClick={() => handleOpen(null)}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button
                color="red"
                onClick={() => handleOpen(null)}
            >
                <span>Delete</span>
            </Button>
            </DialogFooter>
        </Dialog>
    )
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired
  }

export default DeleteDialog
