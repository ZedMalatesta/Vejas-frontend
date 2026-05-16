# Sprint 1: Project Setup & Component Basics — 2026-05-16
- **What was done:** 
1) Components: channel-card, channel-list;
2) Service (/services/channel-service.ts) to get mock data from /models/channel.data.ts but later from backend;
3) Pipe to convert viewers string from '<number>' to "<number>''/K/M/B viewer/-s";
4) Set up flexible color schema styles for light and dark, attempting to match user system;

## **Problems:** Still feel unconfident with angular things, key pain points is:
1) Pipes implementation;
2) Correct service connection;
3) Styles(but it's problem with CSS)

- **Solutions:** Read documentation and search where exactly i was wrong with ai and fix it

- **What I learned:** how to use input() to insert data into components and usage for computed() to recalculate viewers count and display data after transformation in pipe

- **Plans:** 1) Add Loading for list of cards; 2) Make cards clickable and navigating to channel page; 3) Make design more flexible and mobile freandly(now is not optimised); 4) Create backend and fetch real date from it; 5)Performance optimisation, look at OnPush change detection and leazy loading; 6) One more time CSS optimisation, maybe tomorrow as well; 

- **Time spent:** ~8 hours
