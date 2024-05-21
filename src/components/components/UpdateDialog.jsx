import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Textarea, Typography } from "@material-tailwind/react"
import { Formik } from "formik";
import PropTypes from 'prop-types';
import { object, string, date } from "yup";
import { updateProject } from "../../api/projectApi";
import toast from "react-hot-toast";

const UpdateDialog = ({open, handleOpen, onUpdate, project}) => {
    const onSave = (values, setSubmitting, resetForm) => {
        const promise = updateProject(values.id, values);
        toast.promise(promise, {
            loading: 'Loading...',
            success: 'Project Updated Successfully',
            error: 'Error while updating the Project'
        })
        promise
            .then(() => onUpdate())
            .finally(() => (handleOpen(null),setSubmitting(false),resetForm()))
    }

    return (
        <Formik
            initialValues={{ id: project.id, name: project.name, description: project.description, startDate: project.startDate, endDate: project.endDate}}
            enableReinitialize={true}
            validationSchema={object({
                name: string().max(50, "Name is too long").required("Required"),
                description: string()
                    .max(355, "Description is too long")
                .required("Required"),
                startDate: date().nullable()
                .transform((curr, orig) => (orig === '' ? null : curr)).test(
                    'validPeriod',
                    'Please enter start date, end date order correctly.',
                    function (value, context) {
                    const endDateValue = (context.parent)['endDate'];
                    if (!endDateValue || isNaN(endDateValue.getTime())) return true;
                    if (!value) return true;
                    return value.getTime() < endDateValue.getTime();
                    },
                ).required('Required'),
                endDate: date().nullable()
                .transform((curr, orig) => (orig === '' ? null : curr)).test(
                    'validPeriod',
                    'Please enter start date, end date order correctly',
                    function (value, context) {
                        const startDateValue = (context.parent)['startDate'];
                        if (!startDateValue || isNaN(startDateValue.getTime())) return true;
                        if (!value) return true;
                        return startDateValue.getTime() < value.getTime();
                    },
                    )
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                onSave(values, setSubmitting, resetForm);
            }}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    resetForm,
                }) => (
                        <Dialog
                            open={open}
                            size="sm"
                            handler={handleOpen}
                        >
                            <DialogHeader>Update Project</DialogHeader>
                            <DialogBody>
                                <div className="mb-6">
                                    <Input 
                                        label="Name" 
                                        name="name" 
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.name && touched.name}
                                    />
                                    {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
                                </div>
                                <div className="mb-6">
                                    <Textarea 
                                        label="Description" 
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.description && touched.description}
                                    />
                                    {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
                                </div>
                                <div className="mb-6">
                                    <Input 
                                        label="Start Date"  
                                        type="date" 
                                        name="startDate"
                                        value={values.startDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.startDate && touched.startDate}
                                    />
                                    {errors.startDate && <Typography variant="small" color="red">{errors.startDate}</Typography>}
                                </div>
                                <div className="mb-6">
                                    <Input 
                                        label="End Date"  
                                        type="date" 
                                        name="endDate"
                                        value={values.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.endDate && touched.endDate}
                                    />
                                    {errors.endDate && <Typography variant="small" color="red">{errors.endDate}</Typography>}
                                </div>
                            </DialogBody>
                            <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => {
                                    handleOpen(null);
                                    resetForm();
                                }}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                loading={isSubmitting}
                            >
                                <span>Confirm</span>
                            </Button>
                            </DialogFooter>
                    </Dialog>)}
        </Formik>
    )
}

UpdateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
  }

export default UpdateDialog
