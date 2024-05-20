import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import PropTypes from 'prop-types';

const UpdateDialog = ({open, handleOpen}) => {
    return (
        <Dialog
            open={open}
            size="sm"
            handler={handleOpen}
        >
            <DialogHeader>Update Project</DialogHeader>
            <DialogBody>
            The key to more success is to have a lot of pillows. Put it this way,
            it took me twenty five years to get these plants, twenty five years of
            blood sweat and tears, and I&apos;m never giving up, I&apos;m just
            getting started. I&apos;m up to something. Fan luv.
            </DialogBody>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={() => handleOpen(null)}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button
                onClick={() => handleOpen(null)}
            >
                <span>Confirm</span>
            </Button>
            </DialogFooter>
        </Dialog>
    )
}

UpdateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired
  }

export default UpdateDialog
