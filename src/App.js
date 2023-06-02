import styled from "@emotion/styled";
import { AppBar, Button, Card, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, GlobalStyles, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, Paper, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import baju from "./baju.png";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ImageSlider from "./components/ImageSlider";
import SortIcon from '@mui/icons-material/Sort';

const Item = styled(Paper)(() => ({
  backgroundColor: '#FFFFFF',
  padding: '5px 2px',
}))

const AppTitle = styled(Typography)(() => ({
  fontFamily: 'Akira Expanded, sans-serif',
  fontSize: '16px'

}))

const BButton = styled(Button)(() => ({
  fontFamily: 'Work Sans, comic sans',
  background: '#444444',
  color: 'white',
  padding: '2px 40px',
  '&:hover': {
    background: '#646464'
  }

}))

const ColorButton = styled(ToggleButton)(() => ({
  fontFamily: 'Work Sans, comic sans',
  textTransform: 'capitalize !important',
  margin: '2px 4px',
  fontSize: '14px',
  color: 'black',
  backgroundColor: 'white',
  padding: '2px 20px',
  '&:hover': {
    backgroundColor: '#ebebeb'
  }, "&.Mui-selected": {
    color: "white",
    backgroundColor: '#adadad'
  }

}))

const Text = styled(Typography)(() => ({
  fontFamily: 'Work Sans, comic sans',

}))

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    color: "#000133",
    padding: '90px 80px',
    position: 'relative'
  },
  appBar: {
    backgroundColor: '#444444',
    color: 'white'
  },
  container: {
    display: "flex",
    flex: 1,
  },
  footer: {
    height: "50px",
    paddingTop: 30,
    position: 'absolute',
    bottom: 0,
    width: '90%'
  },
  toogleButton: {
    width: 45,
    fontSize: '24px',
    fontFamily: 'Work Sans, comic sans',
  },
}))

function App() {
  const baseURL = "https://646f0ae509ff19b1208674bc.mockapi.io/"
  const [data, setData] = useState([])
  console.log("🚀 ~ file: App.js:45 ~ App ~ data:", data)
  const [filteredData, setFilteredData] = useState([])
  console.log("🚀 ~ file: App.js:46 ~ App ~ filteredData:", filteredData)
  const [kategori, setKategori] = useState([])
  const [warna, setWarna] = useState([])
  const classes = useStyles()
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSort = Boolean(anchorEl);
  const [sortType, setSortType] = useState('Urutkan')
  const [filterCount, setFilterCount] = useState(0)
  const [selected, setSelected] = useState({
    kategori: [],
    warna: []
  });
  console.log("🚀 ~ file: App.js:59 ~ App ~ selected:", selected)
  const [open, setOpen] = useState({
    kategori: false,
    warna: false
  });
  const [openDialog, setOpenDialog] = useState(false)
  const [size, setSize] = useState('');

  useEffect(() => {
    try {
      axios.get(`${baseURL}product`)
        .then((response) => {
          setData(response.data)
        })

    } catch (error) {
    }

  }, [])

  const handleClickSort = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleSort = (type) => {
    setSortType(type)
    setAnchorEl(null)
    if (filteredData?.length === 0) {
      if (type === 'Latest') {
        const sorted = data.sort((a, b) =>
          new Date(a.created_date) - new Date(b.created_date)
        )
        setFilteredData(sorted)
      } else if (type === 'Oldest') {
        const sorted = data.sort((a, b) =>
          new Date(b.created_date) - new Date(a.created_date)
        )
        setFilteredData(sorted)
      } else if (type === 'Paling Mahal') {
        const sorted = data.sort((a, b) =>
          b.harga - a.harga
        )
        setFilteredData(sorted)
      } else if (type === 'Paling Murah') {
        const sorted = data.sort((a, b) =>
          a.harga - b.harga
        )
        setFilteredData(sorted)
      }
    } else {
      if (type === 'Latest') {
        const sorted = filteredData.sort((a, b) =>
          new Date(a.created_date) - new Date(b.created_date)
        )
        setFilteredData(sorted)
      } else if (type === 'Oldest') {
        const sorted = filteredData.sort((a, b) =>
          new Date(b.created_date) - new Date(a.created_date)
        )
        setFilteredData(sorted)
      } else if (type === 'Paling Mahal') {
        const sorted = filteredData.sort((a, b) =>
          b.harga - a.harga
        )
        setFilteredData(sorted)
      } else if (type === 'Paling Murah') {
        const sorted = filteredData.sort((a, b) =>
          a.harga - b.harga
        )
        setFilteredData(sorted)
      }

    }
  };

  useEffect(() => {
    setFilterCount(selected.warna.length + selected.kategori.length)
  }, [selected])


  const handleAlignment = (event, newAlignment) => {
    setSize(newAlignment);
  };


  const handleClickDialog = (item = null) => {
    setOpenDialog(!openDialog);
    if (item !== null) {
      setSelectedItem(item)
    }
  };

  const handleClick = (type) => {
    setOpen(prevState => ({
      ...prevState,
      [type]: !open[type]
    }));

  };


  useEffect(() => {
    if (data?.length > 0) {
      let kat = []
      let color = []
      for (const item of data) {
        color.push(item?.warna)
        for (const item2 of item?.kategori) {
          kat.push(item2?.name)

        }
      }
      let uniqueKat = [...new Set(kat)];
      let uniqueColor = [...new Set(color)];
      setKategori(uniqueKat)
      setWarna(uniqueColor)

    }

  }, [data?.length])

  const kategoriHandler = (e) => {
    if (selected.kategori.includes(e.target.name)) {
      const removeFiltered = selected.kategori.filter((item) => item !== e.target.name)
      setSelected({
        ...selected,
        kategori: removeFiltered
      })
    } else {
      setSelected({
        ...selected,
        kategori: [...selected?.kategori, e.target.name]
      })

    }
  }

  const warnaHandler = (nameColor) => {
    if (selected.warna.includes(nameColor)) {
      const removeFiltered = selected.warna.filter((item) => item !== nameColor)
      setSelected({
        ...selected,
        warna: removeFiltered
      })
    } else {
      setSelected({
        ...selected,
        warna: [...selected?.warna, nameColor]
      })

    }
  }

  useEffect(() => {
    if (selected.warna.length > 0) {
      //Filter an array object with an array
      if (selected.kategori.length > 0) {
        const myArrayFiltered = filteredData.filter((el) => {
          return selected?.warna.some((f) => {
            return f === el.warna
          });
        });
        console.log("🚀 ~ file: App.js:271 ~ myArrayFiltered ~ myArrayFilteredWARNA:", myArrayFiltered)
        setFilteredData(myArrayFiltered)
        console.log("filteredData", filteredData);
      } else {
        const myArrayFiltered = data.filter((el) => {
          return selected?.warna.some((f) => {
            return f === el.warna
          });
        });
        setFilteredData(myArrayFiltered)
      }
    }
  }, [selected.warna, filteredData.length, selected.kategori])

  useEffect(() => {
    if (selected.kategori.length > 0) {
      //Filter an nested array object with an array
      if (selected.warna.length > 0) {
        const myArrayFiltered = filteredData.filter(d => d.kategori.some(c => selected.kategori.includes(c.name)));
        console.log("🚀 ~ file: App.js:290 ~ useEffect ~ myArrayFilteredKAT:", myArrayFiltered)
        setFilteredData(myArrayFiltered)

      } else {
        const myArrayFiltered = data.filter(d => d.kategori.some(c => selected.kategori.includes(c.name)));
        setFilteredData(myArrayFiltered)
      }

    }
  }, [selected.kategori, filteredData.length, selected.warna])

  useEffect(() => {
    if (selected.warna.length === 0 && selected.kategori.length === 0) {
      setFilteredData([])
    }
  }, [selected])

  const divColorHandler = (val) => {
    if (val == 'merah') {
      return "red"
    } else if (val == 'hitam') {
      return 'black'
    } else if (val == 'biru') {
      return 'blue'
    } else if (val == 'kuning') {
      return 'yellow'
    } else if (val == 'cream') {
      return '#FFFDD0'
    } else if (val == 'abu abu') {
      return 'gray'
    } else {
      return 'linear-gradient(to right, #33ccff 0%, #ff3399 100%)'
    }
  }

  return (
    <div className={classes.root} >
      <AppBar className={classes.appBar} sx={{ bgcolor: '#FFFFFF', color: '#444444' }}>
        <Toolbar>
          <AppTitle >
            Tee Commerce
          </AppTitle>
        </Toolbar>
      </AppBar>
      <Grid container spacing={7}>
        <Grid
          item
          xl={3}
          lg={4}
          md={4}
          sm={12}
          xs={12}
        >
          <Item elevation={2}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
              <Text align="left" fontWeight={'bold'} >  {`Filter (${filterCount})`} </Text>
              <Divider sx={{ paddingTop: 1 }}></Divider>
              <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >

                <ListItemButton onClick={() => handleClick('warna')}>
                  <ListItemText
                    primary={<Text align="left" fontWeight={'bold'} > Warna </Text>}
                  />
                  {open?.warna ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open?.warna} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Grid container>
                      {warna?.map((item) => (
                        <Grid item>
                          <ColorButton key={item} onClick={() => warnaHandler(item)}
                            value={item}
                            selected={selected.warna.find((itm) => itm === item)}
                            variant="contained">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ background: divColorHandler(item), width: '12px', height: '12px', borderRadius: 2, marginRight: 5, border: '0.1px solid black' }}> </div>
                              {`${item.charAt(0).toUpperCase()}${item.slice(1)}`}
                            </div>
                          </ColorButton>

                        </Grid>
                        // <Grid item
                        //   xl={6}
                        //   lg={6}
                        //   md={6}
                        //   sm={12}
                        //   xs={12}
                        // >
                        //   <ListItemButton sx={{ pl: 4 }} disableRipple  >
                        //     <ListItemIcon>
                        //       <Checkbox
                        //         edge="start"
                        //         name={item}
                        //         onClick={warnaHandler}
                        //         checked={selected?.warna?.find((item2) => item2 === item)}
                        //       />
                        //     </ListItemIcon>
                        //     <ListItemText
                        //       primary={<Text align="left" > {`${item.charAt(0).toUpperCase()}${item.slice(1)}`} </Text>}
                        //     />
                        //   </ListItemButton>
                        // </Grid>
                      ))}
                    </Grid>

                  </List>
                </Collapse>
                <ListItemButton onClick={() => handleClick('kategori')}>
                  <ListItemText
                    primary={<Text align="left" fontWeight={'bold'} > Kategori </Text>}
                  />
                  {open?.kategori ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open?.kategori} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Grid container>
                      {kategori?.map((item) => (
                        <Grid item
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                        >
                          <ListItemButton sx={{ pl: 4 }} disableRipple >
                            <ListItemIcon>
                              <Checkbox
                                size="small"
                                edge="start"
                                name={item}
                                onClick={kategoriHandler}
                                checked={selected?.kategori?.find((item2) => item2 === item)}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={<Text align="left" > {`${item.charAt(0).toUpperCase()}${item.slice(1)}`} </Text>}
                            />

                          </ListItemButton>
                        </Grid>
                      ))}
                    </Grid>

                  </List>
                </Collapse>
              </List>
            </div>
          </Item>
        </Grid>

        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          sm={12}
          xs={12}
        >
          <div style={{ paddingBottom: 20, float: 'right' }}>
            <BButton variant="contained" onClick={handleClickSort} endIcon={<SortIcon />}> {sortType} </BButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              sx={{ width: 175 }}
              open={openSort}
              onClose={handleCloseSort}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() =>
                handleSort('Latest')
              } >
                <Text>
                  Latest
                </Text>
              </MenuItem>
              <MenuItem onClick={() =>
                handleSort('Oldest')
              } >
                <Text>
                  Oldest
                </Text>

              </MenuItem>
              <MenuItem onClick={() =>
                handleSort('Paling Murah')
              } >
                <Text>
                  Paling Murah
                </Text>

              </MenuItem>
              <MenuItem onClick={() =>
                handleSort('Paling Mahal')
              } >
                <Text>
                  Paling Mahal
                </Text>

              </MenuItem>
            </Menu>
          </div>
          <Grid container spacing={2} rowGap={2}>
            {
              selected.warna.length === 0 && selected.kategori.length === 0
                ? data.map((item) => (
                  <Grid item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={4}
                    xs={6}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }} onClick={() => handleClickDialog(item)}>
                      <img src={baju} alt="" width='100%' style={{ objectFit: 'contain' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text sx={{ fontWeight: 700 }}>
                          {item?.nama}
                        </Text>
                        <Text >
                          {`Rp. ${item?.harga}`}
                        </Text>
                      </div>
                    </div>
                  </Grid>
                ))
                : filteredData.map((item) => (
                  <Grid item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={4}
                    xs={6}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer' }} onClick={() => handleClickDialog(item)}>
                      <img src={baju} alt="" width='100%' style={{ objectFit: 'contain' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text sx={{ fontWeight: 700 }}>
                          {item?.nama}
                        </Text>
                        <Text>
                          {`Rp. ${item?.harga}`}
                        </Text>
                      </div>
                    </div>
                  </Grid>
                ))

            }
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
            <Stack spacing={2}>
              <Pagination count={10} size="large" />
            </Stack>
          </div>
        </Grid>
      </Grid >
      {/* Incase needed */}
      {/* <footer className={classes.footer}>Footer</footer>  */}

      {/* Detail Modal */}
      <Dialog
        open={openDialog}
        onClose={handleClickDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={'lg'}
      >
        <DialogContent sx={{ paddingTop: 8 }}>
          <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Grid item
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={12}>
              <ImageSlider />
            </Grid>
            <Grid item
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={12}>
              <Text sx={{ fontSize: '24px' }}>
                {selectedItem?.nama}
              </Text>
              <Text sx={{ fontSize: '24px', fontWeight: 700 }} >
                {`Rp. ${selectedItem?.harga ?? '-'}`}
              </Text>
              <ToggleButtonGroup
                sx={{ paddingTop: 3 }}
                value={size}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="XL" sx={{ fontWeight: 700 }} className={classes.toogleButton} >
                  XL
                </ToggleButton>
                <ToggleButton value="L" sx={{ fontWeight: 700 }} className={classes.toogleButton}>
                  L
                </ToggleButton>
                <ToggleButton value="M" sx={{ fontWeight: 700 }} className={classes.toogleButton}>
                  M
                </ToggleButton>
                <ToggleButton value="S" sx={{ fontWeight: 700 }} className={classes.toogleButton}>
                  S
                </ToggleButton>
                <ToggleButton value="XS" sx={{ fontWeight: 700 }} className={classes.toogleButton}>
                  XS
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Hanya untuk info kalau sorting benar */}
              <Text sx={{ fontWeight: 'bold' }}>{selectedItem?.warna}</Text>
              {selectedItem?.kategori?.map((item) => (
                <Text>{item?.name}</Text>
              ))}

              <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
                <BButton variant="contained" > Beli </BButton>
              </div>

            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div >


  );
}

export default App;
