import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { object, string, date } from 'yup';
import { createProject } from '../api/projectApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateDialog = ({ open, handleOpen, onCreate }) => {
  const navigate = useNavigate();
  const onSave = (values, setSubmitting, resetForm) => {
    console.log(values);
    const createPromise = createProject(values);
    toast.promise(createPromise, {
      loading: 'Loading...',
      success: 'Project Created Successfully',
      error: 'Error while creating the Project',
    });
    createPromise
      .then(() => onCreate())
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login');
        }
      })
      .finally(() => (handleOpen(null), setSubmitting(false), resetForm()));
  };

  return (
    <Formik
      initialValues={{ name: '', description: '', startDate: '', endDate: '' }}
      validationSchema={object({
        name: string().max(50, 'Name is too long').required('Required'),
        description: string()
          .max(355, 'Description is too long')
          .required('Required'),
        startDate: date()
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .test(
            'validPeriod',
            'Please enter start date, end date order correctly.',
            function (value, context) {
              const endDateValue = context.parent['endDate'];
              if (!endDateValue || isNaN(endDateValue.getTime())) return true;
              if (!value) return true;
              return value.getTime() < endDateValue.getTime();
            }
          )
          .required('Required'),
        endDate: date()
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .test(
            'validPeriod',
            'Please enter start date, end date order correctly',
            function (value, context) {
              const startDateValue = context.parent['startDate'];
              if (!startDateValue || isNaN(startDateValue.getTime()))
                return true;
              if (!value) return true;
              return startDateValue.getTime() < value.getTime();
            }
          ),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
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
        <Dialog open={open} size="sm" handler={handleOpen}>
          <DialogHeader>Create Project</DialogHeader>
          <DialogBody>
            <div className="mb-6">
              <Input
                label="Name *"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name}
              />
              {errors.name && (
                <Typography variant="small" color="red">
                  {errors.name}
                </Typography>
              )}
            </div>
            <div className="mb-6">
              <Textarea
                label="Description *"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description && touched.description}
              />
              {errors.description && (
                <Typography variant="small" color="red">
                  {errors.description}
                </Typography>
              )}
            </div>
            <div className="mb-6">
              <Input
                label="Start Date *"
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.startDate && touched.startDate}
              />
              {errors.startDate && (
                <Typography variant="small" color="red">
                  {errors.startDate}
                </Typography>
              )}
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
              {errors.endDate && (
                <Typography variant="small" color="red">
                  {errors.endDate}
                </Typography>
              )}
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
            <Button onClick={handleSubmit} loading={isSubmitting}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </Formik>
  );
};

CreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateDialog;
