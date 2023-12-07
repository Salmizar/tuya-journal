# Tuya Journal

An App that will capture, store and display Tuya water monitor device data.
There is also a journaling component that will pull Tuya data to add
context to journal entries. See requirements folder for details.

# Build with

```
Frontend: React, TailwindCSS
Backend: Node/Express, PostgreSQL, RESTful API
```

# Instructions on adding TuyAPI and obtaining device id and key

Follow instructions found here. Perform actions in terminal as Admin

https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md

If reset the device you will need to obtain a new device key from tuya-cli wizard

# Sensor information
```
{
  sensorXX: {
    name: "Custom sensor name",
    id: 'xxxxxxxxxxxxxxxxxxx',
    key: 'xxxxxxxxxxxxxxxxxx'
    ip: 'xxx.xxx.xxx.xxx',//Optional: device search is automatically run
    version: '3.3',//Optional: use if not refreshing
    issueRefreshOnConnect: true //Optional: use if not refreshing
  }
}
```
# Sensor Event Data 


  DP_REFRESH and Data Events
  ```
  ID    Description                Output
  101:  Start                      AQEBAQEBAA==
  8:    Temperature (17.7c)        177
  102:  PH (6.23)                  623
  107:  TDS (600 PPM)              600
  110:  EC (1200 US)               1200
  113:  Salinity (737 PPM)         737
  116:  Proportion (0.981 S.G)     981
  119:  End                        0
```

# Env Variables

```
PORT=3001
NODE_ENV='development'
PG_HOST='xxx'
PG_PORT=xxx
PG_USER='tuyajournaluser'
PG_PASSWORD='change_me'
PG_DATABASE='tuyajournal'
UNIT='C'# C or F
DISPLAY='PH'# PH, TEMP, TDS, EC, SAL, SG
INTERVAL='D'# H, D, W, M, Y
```