import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    subheader: 'HVAC',
    caption: 'Wall framing is plumb and aligned,',
    items: [
      {
        id: 'correct_installation_of_heating_and_cooling_equipment',
        label: 'Heating and cooling equipment is installed correctly.',
      },
      {
        id: 'appropriately_sized_and_insulated_ductwork',
        label: 'Ductwork is appropriately sized and insulated ',
      },
      {
        id: 'adequate_ventilation_for_proper_air_circulation',
        label: 'Ventilation systems ensure proper air circulation.',
      },
      {
        id: 'meeting_energy_efficiency_standards',
        label: 'Energy efficiency standards are met',
      },
      {
        id: 'adherence_to_safety_regulations_for_combustion_appliances',
        label: 'Safety regulations for combustion appliances are followed.',
      },
      {
        id: 'performance_of_system_balancing',
        label: 'System balancing is performed',
      },
      {
        id: 'proper_installation_of_air_filters',
        label: 'Air filters are correctly installed',
      },
      {
        id: 'functioning_thermostats_and_controls',
        label: 'Thermostats and controls are functioning properly.',
      },
    ],
  },
  //   {
  //     subheader: 'Application',
  //     caption: 'Donec mi odio, faucibus at, scelerisque quis',
  //     items: [
  //       { id: 'application_news', label: 'News and announcements' },
  //       { id: 'application_product', label: 'Weekly product updates' },
  //       { id: 'application_blog', label: 'Weekly blog digest' },
  //     ],
  //   },
];

// ----------------------------------------------------------------------
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'src/components/image';
import { Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AccountNotifications({ data, client_id }) {
  const { enqueueSnackbar } = useSnackbar();
  // Initialize state for the text field
  const [notes, setNotes] = useState(data.hvac_inspection[0].notes);
  const [stageCompleted, setStageCompleted] = useState(data.hvac_inspection[0].is_completed);

  // Define the onChange handler function
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleStageChange = (event) => {
    setStageCompleted(event.target.checked);
    const newData = { ...currentClientData };
    if (newData.hvac_inspection && newData.hvac_inspection[0]) {
      newData.hvac_inspection[0] = {
        ...newData.hvac_inspection[0],
        ['is_completed']: event.target.checked,
      };

      // Update the state with the new data
      setCurrentClientData(newData);
      console.log('ONCHANHE', currentClientData.hvac_inspection[0]);
      console.log('ONCHAGE VALUES', values.selected);
    }
  };

  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleFile2Change = (event) => {
    const uploadedFile2 = event.target.files[0];
    setFile2(uploadedFile2);
  };

  console.log('hvac data', data.hvac_inspection[0]);
  function filterTrueValues(obj) {
    const result = [];
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        obj[key] === true &&
        key !== 'status' &&
        key !== 'is_completed'
      ) {
        result.push(key);
      }
    }
    return result;
  }
  const filteredObject = filterTrueValues(data.hvac_inspection[0]);
  console.log(filteredObject);

  const methods = useForm({
    defaultValues: {
      selected: filteredObject,
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (values) => {
    var formdata = new FormData();

    values.selected.forEach((detail) => {
      console.log(detail);
      formdata.append(detail, 'true');
    });

    formdata.append('id', client_id);
    formdata.append('notes', notes);
    formdata.append('is_completed', stageCompleted);
    file && formdata.append('image1', file);
    file2 && formdata.append('image2', file2);

    var requestOptions = {
      method: 'PATCH',
      body: formdata,
      redirect: 'follow',
    };

    const res = await fetch('http://127.0.0.1:8000/client/update-hvac/', requestOptions);
    const data = await res.json();

    if (res.status == 200) {
      enqueueSnackbar('Update success!');
    } else {
      enqueueSnackbar('Permission Denied');
    }
  });

  // const getSelected = (selectedItems, item) =>
  //   selectedItems.includes(item)
  //     ? selectedItems.filter((value) => value !== item)
  //     : [...selectedItems, item];

  const [unselectedItems, setUnselectedItems] = useState([]);

  const getSelected = (selectedItems, item) => {
    if (selectedItems.includes(item)) {
      const newSelectedItems = selectedItems.filter((value) => value !== item);
      setUnselectedItems((prevUnselectedItems) => {
        return [...prevUnselectedItems, item];
      });

      return newSelectedItems;
    } else {
      const newSelectedItems = [...selectedItems, item];
      setUnselectedItems((prevUnselectedItems) => {
        return prevUnselectedItems.filter((unselectedItem) => unselectedItem !== item);
      });

      return newSelectedItems;
    }
  };

  const [currentClientData, setCurrentClientData] = useState([]);

  useEffect(() => {
    const getCurrentClientData = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const res = await fetch(
        `http://localhost:8000/client/client-profiles/${client_id}`,
        requestOptions
      );
      const data = await res.json();
      setCurrentClientData(data);
    };

    getCurrentClientData();
  }, []);

  console.log('CURRENT CLIENT DATA', currentClientData);

  return currentClientData.current_stage > 4 ? (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {NOTIFICATIONS.map((notification) => (
          <Grid key={notification.subheader} container spacing={3}>
            <Grid xs={12} md={4}>
              <Stack
                spacing={{ xs: 1, sm: 2, lg: 10 }}
                direction="column"
                justifyContent="space-between"
                alignItems="stretch"
              >
                <ListItemText
                  primary={notification.subheader}
                  secondary={notification.caption}
                  primaryTypographyProps={{ typography: 'h6', mb: 0.5 }}
                  secondaryTypographyProps={{ component: 'span' }}
                />

                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'background.neutral' }}>
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    <Grid xs={12} md={12}>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{ width: '100%' }}
                      >
                        Upload Images 1
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                      </Button>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{ width: '100%' }}
                      >
                        Upload Images 2
                        <VisuallyHiddenInput type="file" onChange={handleFile2Change} />
                      </Button>
                    </Grid>
                  </Grid>
                  <RHFTextField
                    name="notes"
                    placeholder="Write Stage Notes Here"
                    multiline
                    rows={4}
                    value={notes} // Set the value of the text field to the state
                    onChange={handleNotesChange} // Attach the onChange handler
                  />
                  <FormControlLabel
                    label="Stage Completed"
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={currentClientData?.hvac_inspection?.[0]?.is_completed}
                        onChange={handleStageChange}
                      />
                    }
                    // control={<Switch checked={stageCompleted} onChange={handleStageChange} />}
                    sx={{ m: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </Box>
              </Stack>
            </Grid>

            <Grid xs={12} md={8}>
              <Stack spacing={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral' }}>
                <Controller
                  name="selected"
                  control={control}
                  render={({ field }) => (
                    <>
                      {notification.items.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          label={item.label}
                          labelPlacement="start"
                          control={
                            <Switch
                              // checked={field.value.includes(item.id)}
                              checked={currentClientData?.hvac_inspection?.[0]?.[item.id]}
                              // onChange={() => field.onChange(getSelected(values.selected, item.id))}
                              onChange={(event, checked) => {
                                // Update the form field state with getSelected, assuming it's managing a separate list
                                const newSelected = getSelected(values.selected, item.id);
                                field.onChange(newSelected);

                                // Directly update the boolean value in currentClientData state for foundation_inspection
                                // Make sure to deep clone currentClientData to not mutate the state directly
                                const newData = { ...currentClientData };
                                if (newData.hvac_inspection && newData.hvac_inspection[0]) {
                                  newData.hvac_inspection[0] = {
                                    ...newData.hvac_inspection[0],
                                    [item.id]: checked, // Set the boolean value based on the Switch's checked state
                                  };

                                  // Update the state with the new data
                                  setCurrentClientData(newData);
                                  console.log('ONCHANHE', currentClientData.hvac_inspection[0]);
                                  console.log('ONCHAGE VALUES', values.selected);
                                }
                              }}
                            />
                          }
                          sx={{ m: 0, width: 1, justifyContent: 'space-between' }}
                        />
                      ))}
                    </>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
        ))}

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save Changes
        </LoadingButton>
      </Stack>
      <Stack component={Card} spacing={3} sx={{ p: 3, mt: 5 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            {data?.hvac_inspection[0].image1 ? (
              <Image src={data?.hvac_inspection[0].image1} />
            ) : (
              <Typography>Please Upload First Image</Typography>
            )}
          </Grid>
          <Grid xs={12} md={6}>
            {data?.hvac_inspection[0].image2 ? (
              <Image src={data?.hvac_inspection[0].image2} />
            ) : (
              <Typography>Please Upload Second Image</Typography>
            )}
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  ) : (
    <Box>
      <Typography>Please Complete Previous Stage</Typography>
    </Box>
  );
}
