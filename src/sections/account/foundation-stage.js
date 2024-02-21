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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'src/components/image';
import { Container, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';

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

const NOTIFICATIONS = [
  {
    subheader: 'Foundation',
    caption: 'Wall framing is plumb and aligned,',
    items: [
      {
        id: 'correct_excavation_depth',
        label: 'Foundation excavation depth is correct',
      },
      {
        id: 'proper_soil_compaction_and_leveling',
        label: 'Soil is properly compacted and leveled',
      },
      {
        id: 'accurate_rebar_and_anchor_bolts_placement',
        label: 'Rebar and anchor bolts are correctly placed and aligned',
      },
      {
        id: 'well_installed_formwork_and_bracing',
        label: 'Formwork and bracing are installed properly',
      },
      {
        id: 'adequate_curing_and_moisture_control',
        label: 'Curing and moisture control measures are in place. ',
      },
      {
        id: 'consistent_reinforcement_spacing',
        label: 'Proper reinforcement spacing is maintained',
      },
      {
        id: 'compliant_concrete_mix',
        label: 'Concrete mix meets specifications.',
      },
      {
        id: 'matching_foundation_dimensions_with_plans',
        label: 'Foundation dimensions align with plans',
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

// ----------------------------------------------------------------------

export default function AccountNotifications({ data, client_id }) {
  // const { user } = useAuthContext();
  // console.log('foundation user', user);
  // const { enqueueSnackbar } = useSnackbar();
  // // Initialize state for the text field
  // const [notes, setNotes] = useState(data.foundation_inspection[0].notes);
  // const [stageCompleted, setStageCompleted] = useState(data.foundation_inspection[0].is_completed);

  // // Define the onChange handler function
  // const handleNotesChange = (event) => {
  //   setNotes(event.target.value);
  // };
  // const handleStageChange = (event) => {
  //   setStageCompleted(event.target.checked);
  // };

  // const [file, setFile] = useState(null);
  // const [file2, setFile2] = useState(null);

  // const handleFileChange = (event) => {
  //   const uploadedFile = event.target.files[0];
  //   setFile(uploadedFile);
  // };

  // const handleFile2Change = (event) => {
  //   const uploadedFile2 = event.target.files[0];
  //   setFile2(uploadedFile2);
  // };

  // console.log('foundation data', data.foundation_inspection[0]);
  // function filterTrueValues(obj) {
  //   const result = [];
  //   for (const key in obj) {
  //     if (
  //       obj.hasOwnProperty(key) &&
  //       obj[key] === true &&
  //       key !== 'status' &&
  //       key !== 'is_completed'
  //     ) {
  //       result.push(key);
  //     }
  //   }
  //   return result;
  // }
  // const filteredObject = filterTrueValues(data.foundation_inspection[0]);
  // console.log(filteredObject);

  // const methods = useForm({
  //   defaultValues: {
  //     selected: filteredObject,
  //   },
  // });

  // const {
  //   watch,
  //   control,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const values = watch();

  // const onSubmit = handleSubmit(async (values) => {
  //   if (user.user_id === data.inspector) {
  //     console.log('SUBMITTED VALUES', values);
  //     console.log('SUBMITTED VALUES UNSELECTED', unselectedItems);
  //     var formdata = new FormData();

  //     values.selected.forEach((detail) => {
  //       console.log(detail);
  //       formdata.append(detail, 'true');
  //     });
  //     unselectedItems.forEach((detail) => {
  //       formdata.append(detail, 'false');
  //     });

  //     formdata.append('id', client_id);
  //     formdata.append('notes', notes);
  //     formdata.append('is_completed', stageCompleted);
  //     file && formdata.append('image1', file);
  //     file2 && formdata.append('image2', file2);

  //     var requestOptions = {
  //       method: 'PATCH',
  //       body: formdata,
  //       redirect: 'follow',
  //     };

  //     const res = await fetch('http://127.0.0.1:8000/client/update-foundation/', requestOptions);
  //     const data = await res.json();

  //     if (res.status == 200) {
  //       enqueueSnackbar('Update success!');
  //     }

  //     // try {
  //     //   await new Promise((resolve) => setTimeout(resolve, 500));
  //     //   enqueueSnackbar('Update success!');
  //     //   console.info('FRAMING DATA', values.selected);
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //   } else {
  //     alert('You Dont Have Permision To Update This');
  //   }
  // });

  // // const getSelected = (selectedItems, item) =>
  // //   selectedItems.includes(item)
  // //     ? selectedItems.filter((value) => value !== item)
  // //     : [...selectedItems, item];

  // const [unselectedItems, setUnselectedItems] = useState([]);

  // const getSelected = (selectedItems, item) => {
  //   if (selectedItems.includes(item)) {
  //     // Item is currently selected; deselect it.
  //     // Remove from selectedItems
  //     const newSelectedItems = selectedItems.filter((value) => value !== item);

  //     // Add to unselectedItems if not already present
  //     setUnselectedItems((prevUnselectedItems) => {
  //       return [...prevUnselectedItems, item];
  //     });

  //     return newSelectedItems;
  //   } else {
  //     // Item is not currently selected; select it.
  //     // Add to selectedItems
  //     const newSelectedItems = [...selectedItems, item];

  //     // Remove from unselectedItems
  //     setUnselectedItems((prevUnselectedItems) => {
  //       return prevUnselectedItems.filter((unselectedItem) => unselectedItem !== item);
  //     });

  //     return newSelectedItems;
  //   }
  // };

  const [triggerEffect, setTriggerEffect] = useState(true);
  const [currentClientData, setCurrentClientData] = useState({});

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
  }, [triggerEffect]);

  // console.log('CURRENT CLIENT DATA', currentClientData?.foundation_inspection[0]);

  const [soilType, setSoilType] = useState('');

  const handleChange = (event) => {
    setSoilType(event.target.value);
  };
  const submitSoilType = async () => {
    const formdata = new FormData();
    formdata.append('id', client_id);
    formdata.append('soil_type', soilType);

    const requestOptions = {
      method: 'PATCH',
      body: formdata,
      redirect: 'follow',
    };

    const res = await fetch('http://127.0.0.1:8000/client/update-client-profile/', requestOptions);
    const data = await res.json();
    console.log(data);
    if (res.status == 200) {
      setTriggerEffect(!triggerEffect);
      alert('success');
    } else {
      alert('update failed');
    }
  };

  console.log('CURRENT DATA', currentClientData.soil_type);
  return (
    <>
      <Container>
        <Box sx={{ mb: 15 }}>
          {currentClientData.soil_type == null ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Soil Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={soilType}
                label="Soil Type"
                onChange={handleChange}
              >
                <MenuItem value="sand">Sand</MenuItem>
                <MenuItem value="clay">Clay</MenuItem>
                <MenuItem value="loam">Loam</MenuItem>
              </Select>
              <Button onClick={submitSoilType}>Submit</Button>
            </FormControl>
          ) : (
            ''
          )}
        </Box>
      </Container>
      {/* <FormProvider methods={methods} onSubmit={onSubmit}>
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
                          checked={currentClientData?.foundation_inspection?.[0]?.is_completed}
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
                                checked={currentClientData?.foundation_inspection?.[0]?.[item.id]}
                                // checked={field.value.includes(item.id)}
                                // onChange={() => field.onChange(getSelected(values.selected, item.id))}
                                onChange={(event, checked) => {
                                  // Update the form field state with getSelected, assuming it's managing a separate list
                                  const newSelected = getSelected(values.selected, item.id);
                                  field.onChange(newSelected);

                                  // Directly update the boolean value in currentClientData state for foundation_inspection
                                  // Make sure to deep clone currentClientData to not mutate the state directly
                                  const newData = { ...currentClientData };
                                  if (
                                    newData.foundation_inspection &&
                                    newData.foundation_inspection[0]
                                  ) {
                                    newData.foundation_inspection[0] = {
                                      ...newData.foundation_inspection[0],
                                      [item.id]: checked, // Set the boolean value based on the Switch's checked state
                                    };

                                    // Update the state with the new data
                                    setCurrentClientData(newData);
                                    console.log(
                                      'ONCHANHE',
                                      currentClientData.foundation_inspection[0]
                                    );
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

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
        <Stack component={Card} spacing={3} sx={{ p: 3, mt: 5 }}>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              {data.foundation_inspection[0].image1 ? (
                <Image src={data.foundation_inspection[0].image1} />
              ) : (
                <Typography>Please Upload First Image</Typography>
              )}
            </Grid>
            <Grid xs={12} md={6}>
              {data.foundation_inspection[0].image2 ? (
                <Image src={data.foundation_inspection[0].image2} />
              ) : (
                <Typography>Please Upload Second Image</Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
      </FormProvider> */}

      {currentClientData.soil_type === 'sand' && (
        <SandFoundation data={data} client_id={client_id} />
      )}
      {currentClientData.soil_type === 'clay' && (
        <ClayFoundation data={data} client_id={client_id} />
      )}
      {currentClientData.soil_type === 'loam' && (
        <LoamFoundation data={data} client_id={client_id} />
      )}
    </>
  );
}

//SAND FOUNDATION

// ----------------------------------------------------------------------

const SandFoundationInspectionItems = [
  {
    subheader: 'Sand Foundation Inspection',
    caption: 'Ensure the foundation meets all necessary criteria for stability and compliance.',
    items: [
      {
        id: 'foundation_stable',
        label: 'Foundation is stable',
      },
      {
        id: 'subbase_compacted',
        label: 'Subbase is properly compacted',
      },
      {
        id: 'drainage_present',
        label: 'Adequate drainage is present',
      },
      {
        id: 'water_table_low',
        label: 'Water table is sufficiently low',
      },
      {
        id: 'anchoring_adequate',
        label: 'Anchoring is adequate',
      },
      {
        id: 'underpinning_needed',
        label: 'Underpinning is not needed or properly installed if needed',
      },
      {
        id: 'sand_replaced',
        label: 'Sand is replaced if necessary',
      },
      {
        id: 'erosion_control_in_place',
        label: 'Erosion control measures are in place',
      },
    ],
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function SandFoundation({ data, client_id }) {
  const { user } = useAuthContext();
  console.log('foundation user', user);
  const { enqueueSnackbar } = useSnackbar();
  // Initialize state for the text field
  const [notes, setNotes] = useState(data.foundation_inspection[0].notes);
  const [stageCompleted, setStageCompleted] = useState(data.foundation_inspection[0].is_completed);

  // Define the onChange handler function
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleStageChange = (event) => {
    setStageCompleted(event.target.checked);
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

  console.log('foundation data', data.foundation_inspection[0]);
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
  const filteredObject = filterTrueValues(data.foundation_inspection[0]);
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
    if (user.user_id === data.inspector) {
      console.log('SUBMITTED VALUES', values);
      console.log('SUBMITTED VALUES UNSELECTED', unselectedItems);
      var formdata = new FormData();

      values.selected.forEach((detail) => {
        console.log(detail);
        formdata.append(detail, 'true');
      });
      unselectedItems.forEach((detail) => {
        formdata.append(detail, 'false');
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

      const res = await fetch(
        'http://127.0.0.1:8000/client/update-sand-foundation/',
        requestOptions
      );
      const data = await res.json();

      if (res.status == 200) {
        enqueueSnackbar('Update success!');
      }
    } else {
      alert('You Dont Have Permision To Update This');
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
  const [currentClientData, setCurrentClientData] = useState({});

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

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {SandFoundationInspectionItems.map((notification) => (
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
                        checked={currentClientData?.sand_foundation_inspection?.[0]?.is_completed}
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
                              checked={
                                currentClientData?.sand_foundation_inspection?.[0]?.[item.id]
                              }
                              // checked={field.value.includes(item.id)}
                              // onChange={() => field.onChange(getSelected(values.selected, item.id))}
                              onChange={(event, checked) => {
                                // Update the form field state with getSelected, assuming it's managing a separate list
                                const newSelected = getSelected(values.selected, item.id);
                                field.onChange(newSelected);

                                // Directly update the boolean value in currentClientData state for foundation_inspection
                                // Make sure to deep clone currentClientData to not mutate the state directly
                                const newData = { ...currentClientData };
                                if (
                                  newData.sand_foundation_inspection &&
                                  newData.sand_foundation_inspection[0]
                                ) {
                                  newData.sand_foundation_inspection[0] = {
                                    ...newData.sand_foundation_inspection[0],
                                    [item.id]: checked, // Set the boolean value based on the Switch's checked state
                                  };

                                  // Update the state with the new data
                                  setCurrentClientData(newData);
                                  console.log(
                                    'ONCHANHE',
                                    currentClientData.sand_foundation_inspection[0]
                                  );
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
            {data?.sand_foundation_inspection[0].image1 ? (
              <Image src={data?.sand_foundation_inspection[0].image1} />
            ) : (
              <Typography>Please Upload First Image</Typography>
            )}
          </Grid>
          <Grid xs={12} md={6}>
            {data?.sand_foundation_inspection[0].image2 ? (
              <Image src={data?.sand_foundation_inspection[0].image2} />
            ) : (
              <Typography>Please Upload Second Image</Typography>
            )}
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

//CLAY FOUNDATION

// ----------------------------------------------------------------------

const ClayFoundationInspectionItems = [
  {
    subheader: 'Clay Foundation Inspection',
    caption:
      "Evaluate the foundation's condition, ensuring it meets the required standards for clay soil.",
    items: [
      {
        id: 'clay_expansive',
        label: 'Clay soil is not excessively expansive',
      },
      {
        id: 'cracks_present',
        label: 'No significant cracks are present',
      },
      {
        id: 'moisture_barrier_installed',
        label: 'Moisture barrier has been properly installed',
      },
      {
        id: 'drainage_adequate',
        label: 'Drainage around the foundation is adequate',
      },
      {
        id: 'settlement_observed',
        label: 'No settlement issues have been observed',
      },
      {
        id: 'foundation_depth_sufficient',
        label: 'Foundation depth is sufficient for soil conditions',
      },
      {
        id: 'heave_prevention_used',
        label: 'Appropriate measures for heave prevention have been used',
      },
      {
        id: 'trees_proximate',
        label: 'Trees in proximity to the foundation do not pose a risk',
      },
    ],
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function ClayFoundation({ data, client_id }) {
  const { user } = useAuthContext();
  console.log('foundation user', user);
  const { enqueueSnackbar } = useSnackbar();
  // Initialize state for the text field
  const [notes, setNotes] = useState(data.clay_foundation_inspection[0]?.notes);
  const [stageCompleted, setStageCompleted] = useState(
    data.clay_foundation_inspection[0]?.is_completed
  );

  // Define the onChange handler function
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleStageChange = (event) => {
    setStageCompleted(event.target.checked);
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

  console.log('foundation data', data.clay_foundation_inspection[0]);
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
  const filteredObject = filterTrueValues(data.clay_foundation_inspection[0]);
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
    if (user.user_id === data.inspector) {
      console.log('SUBMITTED VALUES', values);
      console.log('SUBMITTED VALUES UNSELECTED', unselectedItems);
      var formdata = new FormData();

      values.selected.forEach((detail) => {
        console.log(detail);
        formdata.append(detail, 'true');
      });
      unselectedItems.forEach((detail) => {
        formdata.append(detail, 'false');
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

      const res = await fetch(
        'http://127.0.0.1:8000/client/update-clay-foundation/',
        requestOptions
      );
      const data = await res.json();

      if (res.status == 200) {
        enqueueSnackbar('Update success!');
      }

      // try {
      //   await new Promise((resolve) => setTimeout(resolve, 500));
      //   enqueueSnackbar('Update success!');
      //   console.info('FRAMING DATA', values.selected);
      // } catch (error) {
      //   console.error(error);
      // }
    } else {
      alert('You Dont Have Permision To Update This');
    }
  });

  // const getSelected = (selectedItems, item) =>
  //   selectedItems.includes(item)
  //     ? selectedItems.filter((value) => value !== item)
  //     : [...selectedItems, item];

  const [unselectedItems, setUnselectedItems] = useState([]);

  const getSelected = (selectedItems, item) => {
    if (selectedItems.includes(item)) {
      // Item is currently selected; deselect it.
      // Remove from selectedItems
      const newSelectedItems = selectedItems.filter((value) => value !== item);

      // Add to unselectedItems if not already present
      setUnselectedItems((prevUnselectedItems) => {
        return [...prevUnselectedItems, item];
      });

      return newSelectedItems;
    } else {
      // Item is not currently selected; select it.
      // Add to selectedItems
      const newSelectedItems = [...selectedItems, item];

      // Remove from unselectedItems
      setUnselectedItems((prevUnselectedItems) => {
        return prevUnselectedItems.filter((unselectedItem) => unselectedItem !== item);
      });

      return newSelectedItems;
    }
  };

  const [currentClientData, setCurrentClientData] = useState({});

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

  // console.log('CURRENT CLIENT DATA', currentClientData?.foundation_inspection[0]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {ClayFoundationInspectionItems.map((notification) => (
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
                        checked={currentClientData?.clay_foundation_inspection?.[0]?.is_completed}
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
                              checked={
                                currentClientData?.clay_foundation_inspection?.[0]?.[item.id]
                              }
                              // checked={field.value.includes(item.id)}
                              // onChange={() => field.onChange(getSelected(values.selected, item.id))}
                              onChange={(event, checked) => {
                                // Update the form field state with getSelected, assuming it's managing a separate list
                                const newSelected = getSelected(values.selected, item.id);
                                field.onChange(newSelected);

                                // Directly update the boolean value in currentClientData state for foundation_inspection
                                // Make sure to deep clone currentClientData to not mutate the state directly
                                const newData = { ...currentClientData };
                                if (
                                  newData.clay_foundation_inspection &&
                                  newData.clay_foundation_inspection[0]
                                ) {
                                  newData.clay_foundation_inspection[0] = {
                                    ...newData.clay_foundation_inspection[0],
                                    [item.id]: checked, // Set the boolean value based on the Switch's checked state
                                  };

                                  // Update the state with the new data
                                  setCurrentClientData(newData);
                                  console.log(
                                    'ONCHANHE',
                                    currentClientData.clay_foundation_inspection[0]
                                  );
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
            {data?.clay_foundation_inspection[0].image1 ? (
              <Image src={data?.clay_foundation_inspection[0].image1} />
            ) : (
              <Typography>Please Upload First Image</Typography>
            )}
          </Grid>
          <Grid xs={12} md={6}>
            {data?.clay_foundation_inspection[0].image2 ? (
              <Image src={data?.clay_foundation_inspection[0].image2} />
            ) : (
              <Typography>Please Upload Second Image</Typography>
            )}
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

//LOAM FOUNDATION

// ----------------------------------------------------------------------

const LoamFoundationInspectionItems = [
  {
    subheader: 'Loam Foundation Inspection',
    caption: 'Checklist for assessing the condition and preparation of loam foundations.',
    items: [
      {
        id: 'organic_matter_adequate',
        label: 'Adequate organic matter present in the soil',
      },
      {
        id: 'compaction_appropriate',
        label: 'Soil compaction is appropriate for foundation support',
      },
      {
        id: 'drainage_good',
        label: 'Drainage conditions are good',
      },
      {
        id: 'pH_optimal',
        label: 'Soil pH is at an optimal level',
      },
      {
        id: 'slope_favorable',
        label: 'Slope conditions are favorable for drainage',
      },
      {
        id: 'erosion_minimal',
        label: 'Erosion is minimal and well-controlled',
      },
      {
        id: 'fertility_good',
        label: 'Soil fertility is good, indicating healthy soil conditions',
      },
      {
        id: 'groundwater_low',
        label: 'Groundwater levels are low enough to not affect the foundation',
      },
    ],
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function LoamFoundation({ data, client_id }) {
  const { user } = useAuthContext();
  console.log('foundation user', user);
  const { enqueueSnackbar } = useSnackbar();
  // Initialize state for the text field
  const [notes, setNotes] = useState(data.loam_foundation_inspection[0].notes);
  const [stageCompleted, setStageCompleted] = useState(
    data.loam_foundation_inspection[0].is_completed
  );

  // Define the onChange handler function
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleStageChange = (event) => {
    setStageCompleted(event.target.checked);
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

  console.log('foundation data', data.loam_foundation_inspection[0]);
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
  const filteredObject = filterTrueValues(data.loam_foundation_inspection[0]);
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
    if (user.user_id === data.inspector) {
      console.log('SUBMITTED VALUES', values);
      console.log('SUBMITTED VALUES UNSELECTED', unselectedItems);
      var formdata = new FormData();

      values.selected.forEach((detail) => {
        console.log(detail);
        formdata.append(detail, 'true');
      });
      unselectedItems.forEach((detail) => {
        formdata.append(detail, 'false');
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

      const res = await fetch(
        'http://127.0.0.1:8000/client/update-loam-foundation/',
        requestOptions
      );
      const data = await res.json();

      if (res.status == 200) {
        enqueueSnackbar('Update success!');
      }
    } else {
      alert('You Dont Have Permision To Update This');
    }
  });

  // const getSelected = (selectedItems, item) =>
  //   selectedItems.includes(item)
  //     ? selectedItems.filter((value) => value !== item)
  //     : [...selectedItems, item];

  const [unselectedItems, setUnselectedItems] = useState([]);

  const getSelected = (selectedItems, item) => {
    if (selectedItems.includes(item)) {
      // Item is currently selected; deselect it.
      // Remove from selectedItems
      const newSelectedItems = selectedItems.filter((value) => value !== item);

      // Add to unselectedItems if not already present
      setUnselectedItems((prevUnselectedItems) => {
        return [...prevUnselectedItems, item];
      });

      return newSelectedItems;
    } else {
      // Item is not currently selected; select it.
      // Add to selectedItems
      const newSelectedItems = [...selectedItems, item];

      // Remove from unselectedItems
      setUnselectedItems((prevUnselectedItems) => {
        return prevUnselectedItems.filter((unselectedItem) => unselectedItem !== item);
      });

      return newSelectedItems;
    }
  };

  const [currentClientData, setCurrentClientData] = useState({});

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

  // console.log('CURRENT CLIENT DATA', currentClientData?.foundation_inspection[0]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        {LoamFoundationInspectionItems.map((notification) => (
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
                        checked={currentClientData?.loam_foundation_inspection?.[0]?.is_completed}
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
                              checked={
                                currentClientData?.loam_foundation_inspection?.[0]?.[item.id]
                              }
                              // checked={field.value.includes(item.id)}
                              // onChange={() => field.onChange(getSelected(values.selected, item.id))}
                              onChange={(event, checked) => {
                                // Update the form field state with getSelected, assuming it's managing a separate list
                                const newSelected = getSelected(values.selected, item.id);
                                field.onChange(newSelected);

                                // Directly update the boolean value in currentClientData state for foundation_inspection
                                // Make sure to deep clone currentClientData to not mutate the state directly
                                const newData = { ...currentClientData };
                                if (
                                  newData.loam_foundation_inspection &&
                                  newData.loam_foundation_inspection[0]
                                ) {
                                  newData.loam_foundation_inspection[0] = {
                                    ...newData.loam_foundation_inspection[0],
                                    [item.id]: checked, // Set the boolean value based on the Switch's checked state
                                  };

                                  // Update the state with the new data
                                  setCurrentClientData(newData);
                                  console.log(
                                    'ONCHANHE',
                                    currentClientData.loam_foundation_inspection[0]
                                  );
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
            {data?.loam_foundation_inspection[0].image1 ? (
              <Image src={data?.loam_foundation_inspection[0].image1} />
            ) : (
              <Typography>Please Upload First Image</Typography>
            )}
          </Grid>
          <Grid xs={12} md={6}>
            {data?.loam_foundation_inspection[0].image2 ? (
              <Image src={data?.loam_foundation_inspection[0].image2} />
            ) : (
              <Typography>Please Upload Second Image</Typography>
            )}
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}
