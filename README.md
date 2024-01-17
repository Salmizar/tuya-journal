# Tuya Journal

An App that will capture, store and display Tuya water monitor device data.
There is also a journaling component that will pull Tuya data to add
context to journal entries. See requirements folder for details.

# Build with

```
Frontend: React, React-Query, TailwindCSS, ReCharts.
Backend: Node/Express, PostgreSQL, TuyAPI, RESTful API.

Recommend running with pm2.
```

# Instructions on adding TuyAPI and obtaining device id and key

Follow instructions found here. Perform actions in terminal as Admin

https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md

If reset the device you will need to obtain a new device key from tuya-cli wizard

# Docker public image available

[Docker Image:salmizar/tuya-journal](https://hub.docker.com/r/salmizar/tuya-journal)
```
Internal port: 3000

Necessary environment variables:
PORT=3000, NODE_ENV='production', PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE
```

# Docker command helpers

Build docker image: In App root folder
```
docker build -t RepoName/tuya-journal .
```
Push to Docker hub (must have an existing repo in your hub to push to)
```
docker push RepoName/tuya-journal
```

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
