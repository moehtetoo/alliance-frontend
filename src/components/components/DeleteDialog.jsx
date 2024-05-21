import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import PropTypes from 'prop-types';
import { deleteProject } from "../../api/projectApi";
import toast from "react-hot-toast";
import { useToggle } from "react-use";

const DeleteDialog = ({open, handleOpen, projectName, projectId, onDelete}) => {
    const [loading, toggleLoading] = useToggle(false);
    const handleDelete = () => {
        toggleLoading();
        const promise = deleteProject(projectId);
        toast.promise(promise, {
            loading: 'Loading...',
            success: 'Project Updated Successfully',
            error: 'Error while updating the Project'
        })
        promise
            .then(() => onDelete())
            .finally(() => (handleOpen(null), toggleLoading()))
    }

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
                onClick={handleDelete}
                loading={loading}
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
    projectName: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
  }

export default DeleteDialog
