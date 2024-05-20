# Catalog Count Web

## 2.1.1
release date:  May 20, 2024

- cc-list improve error handling
- change default report to consider fromMonth, fromYear, toMonth, toYear

## 2.1.0
release date: Apr 25, 2024

- Support multiple accounts within same logged in user
- go-up btn

## 2.0.1
release date: Mar 30, 2024

- branch section enabled to capture initial amount
- add deploy-to-s3.yml github action


## 2.0.0
release date nov 5, 2023

- update angular 12.x - 16.2.12
- Catalog-Count styling
- Added filterBy input

### Breaking changes
- This version now runs under @angular/core@16 and @angular/cli@16 [update to angular 16](https://angular.io/guide/update-to-version-16)

## 1.1.2
release date Apr 9, 2023

- Display branch name as part of navbar
- Change edit and delete (each movement row) from text to icons
- Change Alert threshold from 7 to 10

## 1.1.1

release date July 14, 2022

changes from 1.1.1-beta

### Features

- add report domains to easily manage report response from API
- modify report componet to display report human-friendly

### Documentation

- add Catalog-Count description

## 1.1.1-beta

release date: July 7, 2022

Changes from 1.1.0-beta

### Fix

- extend confirmation date til 10

## 1.1.0-beta

release date: July 3, 2022

### Features

- Period Component
- PeriodResponseList array and small improvements
- Display report details

### Fix

- Fix/change Nav bar
- remove contralor section from nav bar
- updated system information within about section

## 1.0.3

Release Date: June 14, 2022

### What's Changed

- Renamed CatalogCountList to display "Historial de Movimientos'
- Renamed CatalogCountEdit to display "Movimientos"
- api.catalogcounts.com domain how supports https
- confirmedBy is now use as compositeKey in Backend.
  - this change will allow each role (T and S) to confirm a period_detail.

## 1.0.2

Release Date: June 10, 2022

### Features

- funcionatily to "confirm" a period
  - alert-warning message is display to indicate maxdate to finish reporting. A "confirm" btn has been enabled.

### Improvements

- display alert message when period has been confirmed
- display alert-warning message when credentials are wrong (login)
- display "role" number banner section (upper rigth corner)
- on catalog-count edit
  - only numbers are allowed for "amount" field
  - only positive numbers allowed

## 1.0.2-alpha

Release Date: June 7, 2022

### What's Changed

- Feature/editable cc by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/13
- Feature/audit report by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/14

**Full Changelog**: https://github.com/javiertmezac/catalog-counts-web/compare/1.0.0...1.0.2-alpha

## 1.0.1

Release Date: May 21, 2022

### What's Changed

- Develop by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/12

**Full Changelog**: https://github.com/javiertmezac/catalog-counts-web/compare/1.0.0...1.0.1

## 1.0.0

Release Date: May 6, 2022

### What's Changed

- Feature/re created by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/1
- Feature/login by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/4
- Feature/user details by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/5
- Feature/user details by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/10
- Feature/edit catalog count by @javiertmezac in https://github.com/javiertmezac/catalog-counts-web/pull/11

**Full Changelog**: https://github.com/javiertmezac/catalog-counts-web/commits/1.0.0
