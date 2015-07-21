//convenience conversions for timing
const MILS_IN_DAY = 86400000;
const MILS_IN_HOUR = 3600000;
const MILS_IN_MINUTE = 60000;
const MILS_IN_SECOND = 1000;

const PHASE_INTERVAL = 15000;

const REFRESH_INTERVAL = 15000;

const POLL_INTERVAL = 900000;

const TEMPLATES = {
	"NAVBAR":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n\t<head>\n\t\t<script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n\t<\/head>\n\t<body>\n\t\t<viewWithNavigationBar id=\"navbar\" onNavigate=\"eventController.onNavigate(event)\">\n\t\t\t<navigation id = \"navigation\" currentIndex=\"0\">\n\t\t\t\t<navigationItem id=\"keynote\">\n\t\t\t\t\t<title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_KEYNOTE\"] %><\/title>\n\t\t\t\t\t<stash>\n\t\t\t\t\t\t<template>keynote<\/template>\n\t\t\t\t\t<\/stash>\n\t\t\t\t<\/navigationItem>\n\t\t\t\t<% if (eventController.isThereAtleastOneRemainingLiveSession()) { %>\n\t\t\t\t\t<navigationItem id=\"live\">\n\t\t\t\t\t\t<title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_LIVE\"] %><\/title>\n\t\t\t\t\t\t<stash>\n\t\t\t\t\t\t\t<template>live<\/template>\n\t\t\t\t\t\t<\/stash>\n\t\t\t\t\t<\/navigationItem>\n\t\t\t\t<% } %>\n\t\t\t\t<navigationItem id=\"schedule\">\n\t\t\t\t\t<title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_SCHEDULE\"] %><\/title>\n\t\t\t\t\t<stash>\n\t\t\t\t\t\t<template>schedule<\/template>\n\t\t\t\t\t<\/stash>\n\t\t\t\t<\/navigationItem>\n\t\t\t\t<navigationItem id=\"tracks\">\n\t\t\t\t\t<title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_TRACKS\"] %><\/title>\n\t\t\t\t\t<stash>\n\t\t\t\t\t\t<template>tracks<\/template>\n\t\t\t\t\t<\/stash>\n\t\t\t\t<\/navigationItem>\n\t\t\t\t<navigationItem id=\"favorites\">\n\t\t\t\t\t<title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_FAVS\"] %><\/title>\n\t\t\t\t\t<stash>\n\t\t\t\t\t\t<template>favorites<\/template>\n\t\t\t\t\t<\/stash>\n\t\t\t\t<\/navigationItem>\n\t\t\t\t<navigationItem id=\"about\">\n\t\t\t\t\t<title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_ABOUT\"] %><\/title>\n\t\t\t\t\t<stash>\n\t\t\t\t\t\t<template>about<\/template>\n\t\t\t\t\t<\/stash>\n\t\t\t\t<\/navigationItem>\n\t\t\t<\/navigation>\n\t\t<\/viewWithNavigationBar>\n\t<\/body>\n<\/atv>\n",
	"ABOUT":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n      <listWithPreview volatile=\"true\" id=\"about\" refreshInterval=\"10\">\n      <header>\n      \t<simpleHeader accessibilityLabel=\"TODO\">\n  \t      <title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_ABOUT\"] %><\/title>\n     \t  <\/simpleHeader>\n      <\/header>\n      <menu>\n        <sections>\n           <menuSection>\n           \t<items>\n              <oneLineMenuItem id=\"ABOUT_GENERAL\"  accessibilityLabel=\"<%= loc['APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE'] %>\">\n                <label><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE'] %><\/label>\n                <preview>\n                  <keyedPreview>\n                    <title><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE'] %><\/title>\n                    <summary><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC'] %><\/summary>\n                    <image>http:\/\/devstreaming.apple.com\/videos\/wwdc\/2015\/ftzj8e4h\/6rsxhod7fvdtnjnmgsun\/images\/wwdc15-about.png<\/image>\n                  <\/keyedPreview>\n                <\/preview>\n              <\/oneLineMenuItem>\n              <oneLineMenuItem id=\"ABOUT_VIEWING\"  accessibilityLabel=\"<%= loc['APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE'] %>\">\n                <label><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE'] %><\/label>\n                <preview>\n                  <keyedPreview>\n                    <title><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE'] %><\/title>\n                    <summary><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC'] %><\/summary>\n                    <image>http:\/\/devstreaming.apple.com\/videos\/wwdc\/2015\/ftzj8e4h\/6rsxhod7fvdtnjnmgsun\/images\/wwdc15-sessions.png<\/image>\n                  <\/keyedPreview>\n                <\/preview>\n              <\/oneLineMenuItem>\n              <oneLineMenuItem id=\"ABOUT_TERMS\"  accessibilityLabel=\"<%= loc['APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE'] %>\">\n                <label><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE'] %><\/label>\n                <preview>\n                  <keyedPreview>\n                    <title><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE'] %><\/title>\n                    <summary><%= loc['APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC'] %><\/summary>\n                    <image>http:\/\/devstreaming.apple.com\/videos\/wwdc\/2015\/ftzj8e4h\/6rsxhod7fvdtnjnmgsun\/images\/wwdc15-terms.png<\/image>\n                  <\/keyedPreview>\n                <\/preview>\n              <\/oneLineMenuItem>\n            <\/items>\n            <\/menuSection>\n        <\/sections>\n      <\/menu>\n     <\/listWithPreview>\n  <\/body>\n<\/atv>\n",
	"SCHEDULE":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n    <listByNavigation id=\"schedule\" onNavigate=\"eventController.scheduleDidNavigate(event)\" volatile = \"true\" onVolatileReload = \"eventController.volatileScheduleReload(document)\" refreshInterval=\"60\" onRefresh = \"eventController.refreshSchedule()\">\n      <header>\n        <tumblerWithSubtitle accessibilityLabel=\"<%= loc[\"APPLE_EVENTS.WWDC2015_NAV_SCHEDULE\"] %>\">\n\t      <title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_SCHEDULE\"] %><\/title>\n        <subtitle><\/subtitle>\n        <\/tumblerWithSubtitle>\n      <\/header>\n      <navigation id = \"navigation\" currentIndex=\"<%= current_day %>\">\n        <% for (var d = 0; d < days.length; d++) { %>\n          <navigationItem id = \"<%= d %>\" accessibilityLabel=\"TODO\">\n            <title><%= eventController.formatTime(days[d], \"DATE\") %><\/title>\n          <\/navigationItem>\n        <% } %>\n      <\/navigation>\n      <menu id = \"menu-payload\">\n        <sections>\n          <menuSection>\n            <items>\n              <% for (var s = 0; s < schedule[current_day_key].length; s++){ %>\n                <% var session = sessions[schedule[current_day_key][s]] %>\n                <oneLineMenuItem id=\"<%= session.id %>\"\n                                 onSelect=\"eventController.showSession(<%= session.id %>)\"\n                                 onPlay=\"eventController.showSessionStreamIfAvailable(<%= session.id %>)\"\n                                 onHoldSelect=\"eventController.showBluedot(<%= session.id %>)\">\n\n                  <label><%= session.title %><\/label>\n                  <% if (phase && session.id == phase.live) { %>\n                    <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE\"] %><\/rightLabel>\n                  <% } else if (phase && session.id == phase.next) { %>\n                    <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE_NEXT\"] %><\/rightLabel>\n                  <% } else if (new Date(session.end_date) > new Date(atvutils.data(\"now\"))){ %>\n                    <rightLabel><%= eventController.formatTime(session.start_date, \"TIME\") %><\/rightLabel>\n                  <% } %>\n                  <accessories>\n                    <% if (session.url) { %>\n                      <% if (eventController.isVideoUnseen(session.id)) { %>\n                        <unplayedDot\/>\n                      <% } else if (eventController.isVideoPartiallySeen(session.id)) { %>\n                        <partiallyPlayedDot\/>\n                      <% } %>\n                    <% } %>\n                    <arrow\/>\n                  <\/accessories>\n                  <preview>\n                    <keyedPreview>\n                     <title><%= session.title %><\/title>\n                     <rightLabel><\/rightLabel>\n                     <summary><%= session.description %><\/summary>\n                     <image><%= session.images.shelf %><\/image>\n                     <metadataKeys>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TRACK\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_FOCUS\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_DATE\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TIME\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_LOCATION\"] %><\/label>\n                      <\/metadataKeys>\n                      <metadataValues>\n                        <label><%= session.track %><\/label>\n                        <label><%= session.focus.join(\", \") %><\/label>\n                        <label><%= eventController.formatTime(session.start_date, \"DATE\") %><\/label>\n                        <label><%= eventController.formatTime(session.start_date, \"TIME\") %> - <%= eventController.formatTime(session.end_date, \"TIME\") %><\/label>\n                        <label><%= session.location %><\/label>\n                      <\/metadataValues>\n                      <footnote><![CDATA[ ]]><\/footnote>\n                    <\/keyedPreview>\n                  <\/preview>\n                <\/oneLineMenuItem>\n              <% } %>\n            <\/items>\n          <\/menuSection>\n        <\/sections>\n      <\/menu>\n    <\/listByNavigation>\n  <\/body>\n<\/atv>\n",
	"TRACK":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n    <listByNavigation id=\"track\" onNavigate=\"eventController.trackDidNavigate(event)\" volatile = \"true\" onVolatileReload = \"eventController.volatileTrackReload(document)\" refreshInterval=\"60\" onRefresh = \"eventController.refreshTrack()\">\n      <header>\n        <tumblerWithSubtitle accessibilityLabel=\"<%= loc[\"APPLE_EVENTS.WWDC2015_NAV_TRACKS\"] %>\">\n\t      <title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_TRACKS\"] %><\/title>\n\t      <subtitle><\/subtitle>\n        <\/tumblerWithSubtitle>\n      <\/header>\n      <navigation id = \"navigation\" currentIndex=\"<%= current_track %>\">\n        <% for (var d = 0; d < tracks_dict.length; d++) { %>\n          <navigationItem id = \"<%= d %>\" accessibilityLabel=\"TODO\">\n            <title><%= tracks_dict[d] %><\/title>\n          <\/navigationItem>\n        <% } %>\n      <\/navigation>\n      <menu id = \"menu-payload\">\n        <sections>\n          <% for (var d = 0; d < days.length; d++){ %>\n            <% var current_track_day = days[d] %>\n            <% if (tracks[current_track_key][current_track_day] != null){ %>\n              <menuSection>\n                  <header>\n                    <horizontalDivider alignment=\"left\">\n                      <title><%= eventController.formatTime(new Date(current_track_day), \"DATE\") %><\/title>\n                    <\/horizontalDivider>\n                  <\/header>\n                  <items>\n                    <% for (var s = 0; s < tracks[current_track_key][current_track_day].length; s++) { %>\n                      <% var session = sessions[tracks[current_track_key][current_track_day][s]] %>\n                      <oneLineMenuItem id=\"<%= session.id %>\"\n                                       onSelect=\"eventController.showSession(<%= session.id %>)\"\n                                       onPlay=\"eventController.showSessionStreamIfAvailable(<%= session.id %>)\"\n                                       onHoldSelect=\"eventController.showBluedot(<%= session.id %>)\">\n\n                        <label><%= session.title %><\/label>\n                        <% if (phase && session.id == phase.live) { %>\n                          <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE\"] %><\/rightLabel>\n                        <% } else if (phase && session.id == phase.next) { %>\n                          <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE_NEXT\"] %><\/rightLabel>\n                        <% } else if (new Date(session.end_date) > new Date(atvutils.data(\"now\"))){ %>\n                          <rightLabel><%= eventController.formatTime(session.start_date, \"TIME\") %><\/rightLabel>\n                        <% } %>\n                        <accessories>\n                          <% if (session.url) { %>\n                            <% if (eventController.isVideoUnseen(session.id)) { %>\n                              <unplayedDot\/>\n                            <% } else if (eventController.isVideoPartiallySeen(session.id)) { %>\n                              <partiallyPlayedDot\/>\n                            <% } %>\n                          <% } %>\n                          <arrow\/>\n                        <\/accessories>\n                        <preview>\n                          <keyedPreview>\n                           <title><%= session.title %><\/title>\n                           <rightLabel><\/rightLabel>\n                           <summary><%= session.description %><\/summary>\n                           <image><%= session.images.shelf %><\/image>\n                           <metadataKeys>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TRACK\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_FOCUS\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_DATE\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TIME\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_LOCATION\"] %><\/label>\n                            <\/metadataKeys>\n                            <metadataValues>\n                              <label><%= session.track %><\/label>\n                              <label><%= session.focus.join(\", \") %><\/label>\n                              <label><%= eventController.formatTime(session.start_date, \"DATE\") %><\/label>\n                              <label><%= eventController.formatTime(session.start_date, \"TIME\") %> - <%= eventController.formatTime(session.end_date, \"TIME\") %><\/label>\n                              <label><%= session.location %><\/label>\n                            <\/metadataValues>\n                            <footnote><![CDATA[ ]]><\/footnote>\n                          <\/keyedPreview>\n                        <\/preview>\n                      <\/oneLineMenuItem>\n                    <% } %>\n                  <\/items>\n              <\/menuSection>\n            <% } %>\n          <% } %>\n        <\/sections>\n      <\/menu>\n    <\/listByNavigation>\n  <\/body>\n<\/atv>\n",
	"TRACKLIST":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n      <listWithPreview id=\"tracklist\">\n      <header>\n        <simpleHeader accessibilityLabel=\"<%= loc[\"APPLE_EVENTS.WWDC2015_NAV_TRACKS\"] %>\">\n        <title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_TRACKS\"] %><\/title>\n          <subtitle><\/subtitle>\n      <\/simpleHeader>\n      <\/header>\n      <menu>\n        <sections>\n          <menuSection>\n            <items>\n              <% for (var t = 0; t < tracks_dict.length; t++) { %>\n                <% var track = tracks_dict[t] %>\n                <oneLineMenuItem id=\"<%= track %>\"\n                                 onSelect=\"eventController.showTrack(<%= t %>)\"\n                                 onPlay=\"eventController.showTrack(<%= t %>)\">\n\n                  <label><%= track %><\/label>\n                  <accessories>\n                    <arrow\/>\n                  <\/accessories>\n                  <preview>\n                    <imagePreview>\n                      <image required = \"true\"><%= wwdc_poster_url %><\/image>\n                    <\/imagePreview>\n                  <\/preview>\n                <\/oneLineMenuItem>\n              <% } %>\n            <\/items>\n          <\/menuSection>\n        <\/sections>\n      <\/menu>\n     <\/listWithPreview>\n  <\/body>\n<\/atv>\n",
	"SESSION":"<?xml version=\"1.0\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n    <% session = sessions[current_session_id] %>\n    <itemDetail id=\"<%= session.id %>\">\n      <title><%= session.title %><\/title>\n      <summary><%= session.description %><\/summary>\n      <image style=\"squarePoster\"><%= session.images.hero %><\/image>\n      <table>\n        <columnDefinitions>\n          <columnDefinition width=\"100\"\/>\n        <\/columnDefinitions>\n        <rows>\n          <row>\n            <label><%= session.track %><\/label>\n          <\/row>\n          <row>\n            <label><%= session.focus.join(\", \") %><\/label>\n          <\/row>\n          <row>\n            <label><%= eventController.formatTime(session.start_date, \"DATE\") %><\/label>\n          <\/row>\n           <row>\n            <label><%= eventController.formatTime(session.start_date, \"TIME\") %> - <%= eventController.formatTime(session.end_date, \"TIME\") %><\/label>\n          <\/row>\n          <row>\n            <label><%= session.location %><\/label>\n          <\/row>\n          <% if (session.live_streamed) { %>\n            <row id = \"countdown\">\n              <label><\/label>\n            <\/row>\n          <% } %>\n          <row>\n            <mediaBadges>\n              <videoFormat>HD<\/videoFormat>\n            <\/mediaBadges>\n          <\/row>\n        <\/rows>\n      <\/table>\n      <centerShelf>\n        <shelf id=\"centerShelf\" columnCount=\"4\" center=\"true\">\n          <sections>\n            <shelfSection>\n              <items>\n                <% if (atvutils.data(\"phase\") && atvutils.data(\"phase\").live == session.id) { %>\n                  <actionButton id=\"Play\" accessibilityLabel=\"Play\"\n                                onSelect = \"eventController.showLiveSessionStream(<%= session.id %>)\"\n                                  onPlay = \"eventController.showLiveSessionStream(<%= session.id %>)\">\n                    <title><%= loc[\"APPLE_EVENTS.BUTTON_PLAY\"] %><\/title>\n                    <image>resource:\/\/Play.png<\/image>\n                    <focusedImage>resource:\/\/PlayFocused.png<\/focusedImage>\n                  <\/actionButton>\n                <% } else if (session.url != null) { %>\n                  <actionButton id=\"Play\" accessibilityLabel=\"Play\"\n                                onSelect = \"eventController.showSessionStream(<%= session.id %>)\"\n                                  onPlay = \"eventController.showSessionStream(<%= session.id %>)\">\n                    <title><%= loc[\"APPLE_EVENTS.BUTTON_PLAY\"] %><\/title>\n                    <image>resource:\/\/Play.png<\/image>\n                    <focusedImage>resource:\/\/PlayFocused.png<\/focusedImage>\n                  <\/actionButton>\n                <% } %>\n                <actionButton id=\"favorite\" accessibilityLabel=\"TODO\"\n                              onSelect = \"eventController.toggleSessionFavoriteStatus(<%= session.id %>)\"\n                              onPlay = \"eventController.toggleSessionFavoriteStatus(<%= session.id %>)\">\n                  <% if (eventController.isSessionInFavorites(session.id)) { %>\n                    <title><%= loc[\"APPLE_EVENTS.BUTTON_ADD\"] %><\/title>\n                  <% } else { %>\n                    <title><%= loc[\"APPLE_EVENTS.BUTTON_REMOVE\"] %><\/title>\n                  <% } %>\n                  <image>resource:\/\/WishList.png<\/image>\n                  <focusedImage>resource:\/\/WishListFocused.png<\/focusedImage>\n                <\/actionButton>\n              <\/items>\n            <\/shelfSection>\n          <\/sections>\n        <\/shelf>\n      <\/centerShelf>\n      <% if (session.related.length > 0) { %>\n        <divider>\n          <smallCollectionDivider alignment=\"left\" accessibilityLabel=\"Other Events\">\n            <title><%= loc[\"APPLE_EVENTS.RELATED_SESSIONS\"] %><\/title>\n          <\/smallCollectionDivider>\n        <\/divider>\n        <bottomShelf>\n          <shelf id=\"bottomShelf\" columnCount=\"4\">\n            <sections>\n              <shelfSection>\n                <items>\n                  <% for (var s = 0; s < session.related.length; s++) { %>\n                    <% related_session = sessions[session.related[s]] %>\n                    <sixteenByNinePoster id=\"<%= related_session.id %>\" accessibilityLabel=\"TODO\" alwaysShowTitles=\"true\" related=\"true\" onSelect=\"eventController.showSession(<%= related_session.id %>)\">\n                      <title><%= related_session.title %><\/title>\n                      <image><%= related_session.images.shelf %><\/image>\n                    <\/sixteenByNinePoster>\n                  <% } %>\n                <\/items>\n              <\/shelfSection>\n            <\/sections>\n          <\/shelf>\n        <\/bottomShelf>\n      <% } else if (session.related_track && session.related_track.length > 0) { %>\n        <divider>\n          <smallCollectionDivider alignment=\"left\" accessibilityLabel=\"Other Events\">\n            <title><%= loc[\"APPLE_EVENTS.OTHER_SESSIONS\"].replace(\"@@TRACK@@\", session.track) %><\/title>\n          <\/smallCollectionDivider>\n        <\/divider>\n        <bottomShelf>\n          <shelf id=\"bottomShelf\" columnCount=\"4\">\n            <sections>\n              <shelfSection>\n                <items>\n                  <% for (var s = 0; s < session.related_track.length; s++) { %>\n                    <% related_session = sessions[session.related_track[s]] %>\n                    <sixteenByNinePoster id=\"<%= related_session.id %>\" accessibilityLabel=\"TODO\" alwaysShowTitles=\"true\" related=\"true\" onSelect=\"eventController.showSession(<%= related_session.id %>)\">\n                      <title><%= related_session.title %><\/title>\n                      <image><%= related_session.images.shelf %><\/image>\n                    <\/sixteenByNinePoster>\n                  <% } %>\n                <\/items>\n              <\/shelfSection>\n            <\/sections>\n          <\/shelf>\n        <\/bottomShelf>\n      <% } %>\n    <\/itemDetail>\n  <\/body>\n<\/atv>\n",
	"FAVORITES":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n      <listWithPreview volatile=\"true\" id=\"favorites\" onVolatileReload=\"eventController.volatileFavoritesReload(document)\" refreshInterval=\"15\" onRefresh = \"eventController.refreshFavorites()\">\n      <header>\n      \t<simpleHeader accessibilityLabel=\"<%= loc[\"APPLE_EVENTS.WWDC2015_NAV_FAVS\"] %>\">\n\t      <title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_FAVS\"] %><\/title>\n          <subtitle><\/subtitle>\n     \t<\/simpleHeader>\n      <\/header>\n      <menu>\n        <sections>\n          <% for (var d = 0; d < days.length; d++) { %>\n            <% if (favorites[days[d]] != null) { %>\n              <menuSection>\n                <header>\n                  <horizontalDivider alignment=\"left\">\n                    <title><%= eventController.formatTime(new Date(days[d]), \"DATE\") %><\/title>\n                  <\/horizontalDivider>\n                <\/header>\n               \t<items>\n                  <% for (var f = 0; f < favorites[days[d]].length; f++) { %>\n                    <% var session = sessions[favorites[days[d]][f]] %>\n                    <oneLineMenuItem id=\"<%= session.id %>\"\n                                     onSelect=\"eventController.showSession(<%= session.id %>)\"\n                                     onPlay=\"eventController.showSessionStreamIfAvailable(<%= session.id %>)\"\n                                     onHoldSelect=\"eventController.showBluedot(<%= session.id %>)\">\n\n                      <label><%= session.title %><\/label>\n                      <% if (phase && session.id == phase.live) { %>\n                        <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE\"] %><\/rightLabel>\n                      <% } else if (phase && session.id == phase.next) { %>\n                        <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE_NEXT\"] %><\/rightLabel>\n                      <% } else if (new Date(session.end_date) > new Date(atvutils.data(\"now\"))){ %>\n                        <rightLabel><%= eventController.formatTime(session.start_date, \"TIME\") %><\/rightLabel>\n                      <% } %>\n                      <accessories>\n                        <% if (session.url) { %>\n                          <% if (eventController.isVideoUnseen(session.id)) { %>\n                            <unplayedDot\/>\n                          <% } else if (eventController.isVideoPartiallySeen(session.id)) { %>\n                            <partiallyPlayedDot\/>\n                          <% } %>\n                        <% } %>\n                        <arrow\/>\n                      <\/accessories>\n                      <preview>\n                        <keyedPreview>\n                         <title><%= session.title %><\/title>\n                         <rightLabel><\/rightLabel>\n                         <summary><%= session.description %><\/summary>\n                         <image><%= session.images.shelf %><\/image>\n                         <metadataKeys>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TRACK\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_FOCUS\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_DATE\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TIME\"] %><\/label>\n                            <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_LOCATION\"] %><\/label>\n                          <\/metadataKeys>\n                          <metadataValues>\n                            <label><%= session.track %><\/label>\n                            <label><%= session.focus.join(\", \") %><\/label>\n                            <label><%= eventController.formatTime(session.start_date, \"DATE\") %><\/label>\n                            <label><%= eventController.formatTime(session.start_date, \"TIME\") %> - <%= eventController.formatTime(session.end_date, \"TIME\") %><\/label>\n                            <label><%= session.location %><\/label>\n                          <\/metadataValues>\n                          <footnote><![CDATA[ ]]><\/footnote>\n                        <\/keyedPreview>\n                      <\/preview>\n                    <\/oneLineMenuItem>\n                  <% } %>\n                <\/items>\n              <\/menuSection>\n            <% } %>\n          <% } %>\n        <\/sections>\n      <\/menu>\n     <\/listWithPreview>\n  <\/body>\n<\/atv>\n",
	"BLUEDOT":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n    <optionDialog id=\"bluedot\">\n      <header>\n        <simpleHeader accessibilityLabel=\"<%= title %>\">\n          <title><%= title %><\/title>\n        <\/simpleHeader>\n      <\/header>\n      <description><\/description>\n      <menu>\n        <initialSelection>\n          <row>0<\/row>\n        <\/initialSelection>\n        <sections>\n          <menuSection>\n            <items>\n              <% if (eventController.isVideoUnseen(id) || eventController.isVideoPartiallySeen(id)) { %>\n                <oneLineMenuItem id=\"mark_watched\" accessibilityLabel=\"<%= loc['APPLE_EVENTS.MARK_AS_WATCHED'] %>\"  onSelect=\"eventController.markVodWatched('<%= id %>')\">\n                  <label><%= loc['APPLE_EVENTS.MARK_AS_WATCHED'] %><\/label>\n                <\/oneLineMenuItem>\n              <% } if (eventController.isVideoPartiallySeen(id) || eventController.isVideoSeen(id)) { %>\n                <oneLineMenuItem id=\"mark_unwatched\" accessibilityLabel=\"<%= loc['APPLE_EVENTS.MARK_AS_UNWATCHED'] %>\" onSelect=\"eventController.markVodUnwatched('<%= id %>')\">\n                  <label><%= loc['APPLE_EVENTS.MARK_AS_UNWATCHED'] %><\/label>\n                <\/oneLineMenuItem>\n              <% } %>\n              <oneLineMenuItem id=\"mark_all_watched\" accessibilityLabel=\"<%= loc['APPLE_EVENTS.MARK_ALL_AS_WATCHED'] %>\" onSelect=\"eventController.markAllVodsWatched()\">\n                <label><%= loc['APPLE_EVENTS.MARK_ALL_AS_WATCHED'] %><\/label>\n              <\/oneLineMenuItem>\n              <oneLineMenuItem id=\"mark_all_unwatched\" accessibilityLabel=\"<%= loc['APPLE_EVENTS.MARK_ALL_AS_UNWATCHED'] %>\" onSelect=\"eventController.markAllVodsUnwatched()\">\n                <label><%= loc['APPLE_EVENTS.MARK_ALL_AS_UNWATCHED'] %><\/label>\n              <\/oneLineMenuItem>\n            <\/items>\n          <\/menuSection>\n        <\/sections>\n      <\/menu>\n    <\/optionDialog>\n  <\/body>\n<\/atv>\n",
	"EVENT_UBER":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n    <itemDetailWithImageHeader id=\"<%= id %>\" layout=\"compact\">\n      <styles>\n        <color name=\"titleColor\">#ffffff<\/color>\n        <color name=\"metadataColor\">#bababa<\/color>\n      <\/styles>\n      <header>\n        <imageHeader>\n          <image required=\"true\" src720=\"<%= uber720p %>\" insets720=\"0 0 186 0\" src1080=\"<%= uber1080p %>?cachebuster=fuck\" insets1080=\"0 0 280 0\"\/>\n        <\/imageHeader>\n      <\/header>\n      <title><%= title %><\/title>\n      <summary><%= summary %><\/summary>\n      <image style=\"squarePoster\"><%= image %><\/image>\n     <table>\n        <columnDefinitions>\n          <columnDefinition width=\"50\">\n          <\/columnDefinition>\n        <\/columnDefinitions>\n        <rows>\n          <row>\n            <label><%= location %><\/label>\n          <\/row>\n          <row>\n            <label><%= date %><\/label>\n          <\/row>\n          <% if (showTime) { %>\n            <row>\n              <label><%= time %><\/label>\n            <\/row>\n          <% } %>\n          <% if (useCountdown) { %>\n            <row id = \"countdown\">\n              <label><\/label>\n            <\/row>\n          <% } %>\n          <% if (hd) { %>\n            <row>\n              <mediaBadges>\n                <videoFormat>HD<\/videoFormat>\n              <\/mediaBadges>\n            <\/row>\n          <% } %>\n        <\/rows>\n      <\/table>\n      <centerShelf>\n        <shelf id=\"centerShelf\" columnCount=\"1\" center=\"true\">\n          <sections>\n            <shelfSection>\n              <items>\n                <% if (playable) { %>\n                  <actionButton id=\"play\" accessibilityLabel=\"Play Show\" onSelect=\"eventController.watch('<%= id %>')\"\n                                                                           onPlay=\"eventController.watch('<%= id %>')\">\n                    <title><%= play %><\/title>\n                    <image>resource:\/\/Play.png<\/image>\n                    <focusedImage>resource:\/\/PlayFocused.png<\/focusedImage>\n                  <\/actionButton>\n                <% } else { %>\n                  <actionButton id=\"play\" accessibilityLabel=\"Play Show\" onSelect=\"eventController.showError('<%= id %>')\"\n                                                                           onPlay=\"eventController.showError('<%= id %>')\">\n                    <title><%= time %><\/title>\n                    <image>resource:\/\/Later.png<\/image>\n                    <focusedImage>resource:\/\/Later_Focused.png<\/focusedImage>\n                  <\/actionButton>\n                <% } %>\n              <\/items>\n            <\/shelfSection>\n          <\/sections>\n        <\/shelf>\n      <\/centerShelf>\n      <% if (events.length > 0){ %>\n        <divider>\n          <smallCollectionDivider alignment=\"left\" accessibilityLabel=\"<%= smallCollectionDivider_title %>\">\n            <title><%= smallCollectionDivider_title %><\/title>\n          <\/smallCollectionDivider>\n        <\/divider>\n        <bottomShelf>\n          <shelf id=\"bottomShelf\" columnCount=\"6\">\n            <sections>\n              <shelfSection>\n                <items>\n                  <% for (var i = 0; i < events.length; i++) { %>\n                    <squarePoster id=\"<%= events[i].id %>\" accessibilityLabel=\"<%= events[i].id %>\" related=\"true\"  alwaysShowTitles=\"true\"\n                      onSelect=\"eventController.showEvent('<%= events[i].id %>')\"\n                        onPlay=\"eventController.showEvent('<%= events[i].id %>')\">\n                      <title><%= events[i].title %><\/title>\n                      <image><%= events[i].image %><\/image>\n                      <defaultImage>resource:\/\/Square.png<\/defaultImage>\n                    <\/squarePoster>\n                  <% } %>\n                <\/items>\n              <\/shelfSection>\n            <\/sections>\n          <\/shelf>\n        <\/bottomShelf>\n      <% } %>\n    <\/itemDetailWithImageHeader>\n  <\/body>\n<\/atv>\n",
	"EVENT":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n    <itemDetail id =\"<%= id %>\">\n      <title><%= title %><\/title>\n      <summary><%= summary %><\/summary>\n      <image style=\"squarePoster\"><%= image %><\/image>\n     <table>\n        <columnDefinitions>\n          <columnDefinition width=\"50\">\n          <\/columnDefinition>\n        <\/columnDefinitions>\n        <rows>\n          <row>\n            <label><%= date %><\/label>\n          <\/row>\n          <% if (hd) { %>\n            <row>\n              <mediaBadges>\n                <videoFormat>HD<\/videoFormat>\n              <\/mediaBadges>\n            <\/row>\n          <% } %>\n        <\/rows>\n      <\/table>\n      <% if (true) { %>\n        <centerShelf>\n          <shelf id=\"centerShelf\" columnCount=\"1\" center=\"true\">\n            <sections>\n              <shelfSection>\n                <items>\n                  <actionButton id=\"play\" accessibilityLabel=\"Play Show\" onSelect=\"eventController.watch('<%= id %>')\"\n                                                                           onPlay=\"eventController.watch('<%= id %>')\">\n                    <title><%= play %><\/title>\n                    <image>resource:\/\/Play.png<\/image>\n                    <focusedImage>resource:\/\/PlayFocused.png<\/focusedImage>\n                  <\/actionButton>\n                <\/items>\n              <\/shelfSection>\n            <\/sections>\n          <\/shelf>\n        <\/centerShelf>\n      <% } %>\n      <% if (events.length > 0){ %>\n        <divider>\n          <smallCollectionDivider alignment=\"left\" accessibilityLabel=\"<%= smallCollectionDivider_title %>\">\n            <title><%= smallCollectionDivider_title %><\/title>\n          <\/smallCollectionDivider>\n        <\/divider>\n        <bottomShelf>\n          <shelf id=\"bottomShelf\" columnCount=\"6\">\n            <sections>\n              <shelfSection>\n                <items>\n                  <% for (var i = 0; i < events.length; i++) { %>\n                    <squarePoster id=\"<%= events[i].id %>\" accessibilityLabel=\"<%= events[i].id %>\" related=\"true\" alwaysShowTitles=\"true\"\n                      onSelect=\"eventController.showEvent('<%= events[i].id %>')\"\n                        onPlay=\"eventController.showEvent('<%= events[i].id %>')\">\n                      <title><%= events[i].title %><\/title>\n                      <image><%= events[i].image %><\/image>\n                      <defaultImage>resource:\/\/Square.png<\/defaultImage>\n                    <\/squarePoster>\n                  <% } %>\n                <\/items>\n              <\/shelfSection>\n            <\/sections>\n          <\/shelf>\n        <\/bottomShelf>\n      <% } %>\n    <\/itemDetail>\n  <\/body>\n<\/atv>\n",
	"WATCH":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"\/>\n  <\/head>\n  <body>\n    <videoPlayer id=\"wwdc-watch-video\">\n      <httpLiveStreamingVideoAsset id=\"<%= id %>\" indefiniteDuration=\"<%= indefiniteDuration %>\">\n        <mediaURL><%= url %><\/mediaURL>\n        <% if (title) { %>\n          <title><%= title %><\/title>\n        <% } if (description) { %>\n          <description><%= description %><\/description>\n        <% } if (image) { %>\n          <image><%= image %><\/image>\n        <% } %>\n        <% if (!indefiniteDuration && !eventController.isVideoSeen(id)) { %>\n          <bookmarkTime><%= bookmark %><\/bookmarkTime>\n        <% } %>\n      <\/httpLiveStreamingVideoAsset>\n    <\/videoPlayer>\n  <\/body>\n<\/atv>",
	"ERROR":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n\t<body>\n\t\t<dialog id=\"<%= id %>-error-dialog\">\n\t\t\t<title><%= title %><\/title>\n\t\t\t<description><%= description %><\/description>\n\t\t<\/dialog>\n\t<\/body>\n<\/atv>",
	"LIVE":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<atv>\n  <head>\n    <script src=\"<%= atvutils.data('base-url') %>js\/event.js\"><\/script>\n  <\/head>\n  <body>\n      <listWithPreview id=\"live\" volatile=\"true\" onVolatileReload=\"eventController.volatileLiveReload(document)\" refreshInterval=\"15\" onRefresh = \"eventController.refreshLive()\">\n      <header>\n      \t<simpleHeader accessibilityLabel=\"<%= loc[\"APPLE_EVENTS.WWDC2015_NAV_LIVE\"] %>\">\n\t      <title><%= loc[\"APPLE_EVENTS.WWDC2015_NAV_LIVE\"] %><\/title>\n          <subtitle><\/subtitle>\n     \t<\/simpleHeader>\n      <\/header>\n      <menu>\n        <sections>\n          <% for (var d = 0; d < days.length; d++) { %>\n            <% if (live[days[d]] != null && new Date(sessions[live[days[d]][live[days[d]].length - 1]].end_date) >= new Date(atvutils.data(\"now\"))) { %>\n              <menuSection>\n                <header>\n                  <horizontalDivider alignment=\"left\">\n                    <title><%= eventController.formatTime(new Date(days[d]), \"DATE\") %><\/title>\n                  <\/horizontalDivider>\n                <\/header>\n               \t<items>\n                  <% for (var f = 0; f < live[days[d]].length; f++) { %>\n                    <% var session = sessions[live[days[d]][f]] %>\n                    <% if (new Date(session.end_date) > new Date(atvutils.data(\"now\"))) { %>\n                      <oneLineMenuItem id=\"<%= session.id %>\"\n                                       onSelect=\"eventController.showSession(<%= session.id %>)\"\n                                       onPlay=\"eventController.showSessionStreamIfAvailable(<%= session.id %>)\">\n\n                        <label><%= session.title %><\/label>\n                        <% if (phase && session.id == phase.live) { %>\n                          <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE\"] %><\/rightLabel>\n                        <% } else if (phase && session.id == phase.next) { %>\n                          <rightLabel><%= loc[\"APPLE_EVENTS.WWDC2015_LIVE_NEXT\"] %><\/rightLabel>\n                        <% } else if (new Date(session.end_date) > new Date(atvutils.data(\"now\"))){ %>\n                          <rightLabel><%= eventController.formatTime(session.start_date, \"TIME\") %><\/rightLabel>\n                        <% } %>\n                        <preview>\n                          <keyedPreview>\n                           <title><%= session.title %><\/title>\n                           <rightLabel><\/rightLabel>\n                           <summary><%= session.description %><\/summary>\n                           <image><%= session.images.shelf %><\/image>\n                           <metadataKeys>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TRACK\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_FOCUS\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_DATE\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_TIME\"] %><\/label>\n                              <label><%= loc[\"APPLE_EVENTS.WWDC2015_SESSION_LOCATION\"] %><\/label>\n                            <\/metadataKeys>\n                            <metadataValues>\n                              <label><%= session.track %><\/label>\n                              <label><%= session.focus.join(\", \") %><\/label>\n                              <label><%= eventController.formatTime(session.start_date, \"DATE\") %><\/label>\n                              <label><%= eventController.formatTime(session.start_date, \"TIME\") %> - <%= eventController.formatTime(session.end_date, \"TIME\") %><\/label>\n                              <label><%= session.location %><\/label>\n                            <\/metadataValues>\n                            <footnote><![CDATA[ ]]><\/footnote>\n                          <\/keyedPreview>\n                        <\/preview>\n                      <\/oneLineMenuItem>\n                    <% } %>\n                  <% } %>\n                <\/items>\n              <\/menuSection>\n            <% } %>\n          <% } %>\n        <\/sections>\n      <\/menu>\n     <\/listWithPreview>\n  <\/body>\n<\/atv>\n"
}

const INITIAL_EVENT = "WWDC2015";

const EVENTS = {
    "WWDC2015" : {
      "live" : true,
      "uber" : true,
      "live-url" : "http://p.events-delivery.apple.com.edgesuite.net/15pijbnaefvpoijbaefvpihb06/m3u8/atv_mvp.m3u8",
      "vod-url" : "http://p.events-delivery.apple.com.edgesuite.net/15pijbnaefvpoijbaefvpihb06/m3u8/atv_vod_mvp.m3u8",
      "duration" : 7200,
      "countdown" : "2015-06-08T17:00:00.000Z",
      "hd" : true,
      "order" : 1
    },
    "MAR2015" : {
      "uber" : true,
      "url" : "http://p.events-delivery.apple.com.edgesuite.net/1503ohibasdvoihbasfdv/m3u8/atv_vod_mvp.m3u8",
      "duration" : 7200,
      "countdown" : "2015-03-09T17:00:00.000Z",
      "hd" : true,
      "order" : 2
    },
    "OCT2014" : {
      "uber" : true,
      "url"  : "http://p.events-delivery.apple.com.edgesuite.net/14pounqefvoiubefvpiub10/m3u8/atv_vod_mvp.m3u8",
      "duration" : 4740,
      "countdown": "2014-10-16T17:00:00.000Z",
      "hd" : true,
      "order" : 3
    },
    "SEP2014" : {
      "uber" : true,
      "url" : "http://p.events-delivery.apple.com.edgesuite.net/14pijnadfpvkjnfvpijhabdfvpijbadfv09/m3u8/atv_vod_mvp.m3u8",
      "duration" : 7380,
      "countdown": "2014-09-09T17:00:00.000Z",
      "hd" : true,
      "order" : 4
    },
    "WWDC2014": {
      "uber" : true,
      "url" : "http://p.events-delivery.apple.com.edgesuite.net/14poiunaeporfnsvpobjuanefvpjb6a/m3u8/atv_vod_mvp.m3u8",
      "duration" : 7054,
      "countdown": "2014-06-02T17:00:00.000Z",
      "hd" : true,
      "order" : 5
    },
    "OCT2013": {
      "url": "http://p.events-delivery.apple.com.edgesuite.net/13pijbdfvpijhaebfrvqepifhjb10/refs/1310oihboiuedfhbvohbt_atv_vod_ref.mov",
      "duration" : 4994,
      "countdown": "2013-10-22T17:00:00.000Z",
      "hd" : true,
      "order" : 6
    },
    "SEP2013": {
      "url": "http://p.events-delivery.apple.com.edgesuite.net/1309ouhbqdvaeodhbqedvojhbadsfv/refs/13ohbdvohbqsdvojhbdfv09_atv_vod_ref.mov",
      "duration" : 5212,
      "countdown": "2013-09-10T17:00:00.000Z",
      "hd" : true,
      "order" : 7
    }
 }

var LOCALIZATION = {
  "de": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2. Juni 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 Uhr (Pazifik-Zeit)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple Special Event",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Dieses Event steht momentan nicht zum Ansehen zur Verfügung.",
    "APPLE_EVENTS.SECTION_HEADER": "Andere Events",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple Special Event – Oktober 2013",
    "APPLE_EVENTS.OCT2013_DESC": "Sieh dir an, wie Apple CEO Tim Cook das neue iPad Air, das neue iPad mini mit Retina Display, den neuen Mac Pro, OS X Mavericks und die nächste Generation von iWork und iLife Apps präsentiert.",
    "APPLE_EVENTS.OCT2013_DATE": "22. Oktober 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple Special Event – September 2013",
    "APPLE_EVENTS.SEP2013_DESC": "Sieh dir an, wie Apple CEO Tim Cook das neue iPhone 5s, das neue iPhone 5c und mehr vorstellt.",
    "APPLE_EVENTS.SEP2013_DATE": "10. September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 – Keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "Sieh dir an, wie Apple CEO Tim Cook iOS 7, den neuen Mac Pro, OS X Mavericks, das neue MacBook Air, iTunes Radio, iWork für iCloud beta, AirPort Time Capsule und mehr vorstellt.",
    "APPLE_EVENTS.WWDC2013_DATE": "10. Juni 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple Special Event – Oktober 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Sieh dir an, wie Apple CEO Tim Cook das neue iPad mini, das neue iPad mit Retina Display, den neuen iMac, das neue 13\" MacBook Pro mit Retina Display und mehr vorstellt.",
    "APPLE_EVENTS.OCT2012_DATE": "23. Oktober 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple Special Event – September 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Sieh dir an, wie Apple CEO Tim Cook das neue iPhone 5, den neuen iPod touch, den neuen iPod nano und mehr vorstellt.",
    "APPLE_EVENTS.SEP2012_DATE": "12. September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 – Keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "Sieh dir den Videostream mit der Keynote auf der WWDC 2012 an.",
    "APPLE_EVENTS.WWDC2012_DATE": "11. Juni 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Oktober 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Oktober 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "In Kürze",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Wiedergabe",
    "APPLE_EVENTS.COUNTER": "Beginnt in",
    "APPLE_EVENTS.WWDC2014_DESC": "Sieh dir an, wie Apple CEO Tim Cook iOS 8 und OS X Yosemite auf der WWDC 2014 vorstellt.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 – Keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "September 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (Pazifik-Zeit)",
    "APPLE_EVENTS.SEP2014_DATE": "9. September 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Schalte am 9. September um 10:00 Uhr (Pazifik-Zeit) ein, um dieses Event live anzusehen.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@ Tag. @@HOURS@@ Std. @@MINUTES@@ Min. @@SECONDS@@ Sek.",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, Kalifornien",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Oktober 2014",
    "APPLE_EVENTS.AM": "Uhr",
    "APPLE_EVENTS.PM": "Uhr",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@. @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@. @@MONTH@@ @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@ Uhr",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Sept.",
    "APPLE_EVENTS.SEPTEMBER_LONG": "September",
    "APPLE_EVENTS.OCTOBER_SHORT": "Okt.",
    "APPLE_EVENTS.OCTOBER_LONG": "Oktober",
    "APPLE_EVENTS.JUNE_LONG": "Juni",
    "APPLE_EVENTS.SEP2014_DESC": "Von der Präsentation der Apple Watch und des seit Langem erwarteten iPhone 6 bis hin zur Live-Performance von U2 – dieses Event solltest du auf keinen Fall verpassen.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MARCH_LONG": "März",
    "APPLE_EVENTS.MARCH_SHORT": "März",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "März 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple Special Event – LIVE",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.OCT2014_DESC": "Wirf einen ersten Blick auf den iMac mit Retina 5K Display und das iPad Air 2. Erfahre mehr über die Veröffentlichung von OS X Yosemite. Und sieh dir das gesamte Special Event aus dem Town Hall Auditorium auf dem Apple Campus an.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Sieh dir faszinierende Details der Apple Watch an, sei bei der Vorstellung des neuen MacBook dabei und erfahre, welche Innovationen ResearchKit bringt.",
    "APPLE_EVENTS.WWDC2015_DATE": "8. Juni 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Zeitplan",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Themen",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoriten",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Infos",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Live",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Als gesehen markieren",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Als ungesehen markieren",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Alle als gesehen markieren",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Alle als ungesehen markieren",
    "APPLE_EVENTS.BUTTON_LIVE": "Live ansehen",
    "APPLE_EVENTS.BUTTON_ADD": "Hinzufügen",
    "APPLE_EVENTS.BUTTON_REMOVE": "Entfernen",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 – Keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "Weitere Sessions zum Thema „@@TRACK@@“",
    "APPLE_EVENTS.RELATED_SESSIONS": "Zugehörige Sessions",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Sieh dir das Special Event an, das im Moscone Center in San Francisco stattfand.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Dieses Event ist beendet und steht in Kürze zum Ansehen zur Verfügung.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Sieh dir dieses Event live am @@DATE@@. @@MONTH@@ um @@HOUR24@@:@@MINUTE@@ Uhr (Ortszeit) an.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Thema",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Datum",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Uhrzeit",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Ort",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Keine Favoriten",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Bitte Sessions zu den Favoriten hinzufügen.",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Schwerpunkt",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Als Nächstes",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Live-Stream ist beendet.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Keynote – LIVE",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Allgemeine Informationen",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "Auf der Apple Worldwide Developers Conference (WWDC) erhalten Entwickler Einblicke in die Zukunft von iOS und OS X. In mehr als 100 Sessions unter der Leitung von Apple-Spezialisten gibt es interessante Informationen und Inspirationen. Darüber hinaus bieten praxisbezogene Veranstaltungen (Hands-on Labs) Hilfestellung durch Apple-Experten und ermöglichen den Austausch mit anderen Entwicklern, damit die besten Apps noch besser werden. Die WWDC findet vom 8. bis zum 12. Juni 2015 im Moscone West, San Francisco, Kalifornien, statt.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Sessions ansehen",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Wir werden täglich ausgewählte Sessions als Live-Stream zur Verfügung stellen und während der Konferenzwoche auch Videos aller Sessions posten. Weitere Informationen unter: developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Nutzungsbedingungen",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Copyright © 2015 Apple Inc. Alle Rechte vorbehalten. \r\n\r\nAlle Sessions sind nur für den persönlichen, nichtkommerziellen Gebrauch durch unsere Entwickler vorgesehen. Jede andere Nutzung dieser Videobeiträge ist ohne vorherige schriftliche Zustimmung von Apple untersagt. Die beschriebenen Informationen und Technologien können jederzeit geändert werden."
  },
  "fr": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 juin 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10 heures (heure du Pacifique)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Cet événement n’est actuellement pas disponible en vidéo.",
    "APPLE_EVENTS.SECTION_HEADER": "Autres événements",
    "APPLE_EVENTS.OCT2013_TITLE": "Événement spécial d’Apple - Octobre 2013",
    "APPLE_EVENTS.OCT2013_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler le nouvel iPad Air, l’iPad mini avec écran Retina, le Mac Pro, OS X Mavericks et les apps iWork et iLife de nouvelle génération.",
    "APPLE_EVENTS.OCT2013_DATE": "22 octobre 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Événement spécial d’Apple - Septembre 2013",
    "APPLE_EVENTS.SEP2013_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler l’iPhone 5s, l’iPhone 5c et plus.",
    "APPLE_EVENTS.SEP2013_DATE": "10 septembre 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "Keynote de la WWDC 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler iOS 7, le nouveau Mac Pro, OS X Mavericks, le nouveau MacBook Air, iTunes Radio, iWork pour iCloud beta, AirPort Time Capsule et plus.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 juin 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Événement spécial d’Apple - Octobre 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler le nouvel iPad mini, le nouvel iPad avec écran Retina, le nouvel iMac, le nouveau MacBook Pro avec écran Retina de 13 pouces et plus.",
    "APPLE_EVENTS.OCT2012_DATE": "23 octobre 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Événement spécial d’Apple - Septembre 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler le nouvel iPhone 5, le nouvel iPod touch, le nouvel iPod nano et plus.",
    "APPLE_EVENTS.SEP2012_DATE": "12 septembre 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "Keynote de la WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Regardez la vidéo de la keynote de la WWDC 2012.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 juin 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Octobre 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Septembre 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Octobre 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Septembre 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Bientôt",
    "APPLE_EVENTS.BUTTON_TIME": "10h00",
    "APPLE_EVENTS.BUTTON_PLAY": "Lire",
    "APPLE_EVENTS.COUNTER": "Débute dans",
    "APPLE_EVENTS.WWDC2014_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler iOS 8 et OS X Yosemite lors de la WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Keynote de la WWDC 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Septembre 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10h (heure du Pacifique)",
    "APPLE_EVENTS.SEP2014_DATE": "9 septembre 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts (Cupertino)",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Revenez le 9 septembre à 10h (heure du Pacifique) pour regarder l’événement en direct.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@ j @@HOURS@@ h @@MINUTES@@ min @@SECONDS@@ s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino (Californie)",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Octobre 2014",
    "APPLE_EVENTS.AM": "Irrelevant in FR. We use military time.",
    "APPLE_EVENTS.PM": "Irrelevant in FR. We use military time.",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@ @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "sept",
    "APPLE_EVENTS.SEPTEMBER_LONG": "septembre",
    "APPLE_EVENTS.OCTOBER_SHORT": "oct.",
    "APPLE_EVENTS.OCTOBER_LONG": "octobre",
    "APPLE_EVENTS.JUNE_LONG": "juin",
    "APPLE_EVENTS.SEP2014_DESC": "Du lancement de l’Apple Watch à celui de l’iPhone 6 en passant par une prestation live de U2, ne manquez rien de l’événement.",
    "APPLE_EVENTS.SEP2014_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.MARCH_LONG": "Mars",
    "APPLE_EVENTS.MARCH_SHORT": "Mars",
    "APPLE_EVENTS.MAR2015_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts à San Francisco (Californie)",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Mars 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Événement spécial d’Apple en direct",
    "APPLE_EVENTS.OCT2014_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Découvrez l’iMac avec écran Retina 5K, l’iPad Air 2, ainsi que tous les détails sur la sortie d’OS X Yosemite révélés lors de l’événement spécial qui s’est tenu au Town Hall d’Apple.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Découvrez l’Apple Watch sous tous ses angles, apprenez-en plus au sujet du nouveau MacBook et de toutes les possibilités qu’offre ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 juin 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Programme",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Ateliers",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoris",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "À propos",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "En direct",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Marquer comme vu",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Marquer comme à voir",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Marquer tout comme vu",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Marquer tout comme à voir",
    "APPLE_EVENTS.BUTTON_LIVE": "Regarder en direct",
    "APPLE_EVENTS.BUTTON_ADD": "Ajouter",
    "APPLE_EVENTS.BUTTON_REMOVE": "Supprimer",
    "APPLE_EVENTS.WWDC2015_TITLE": "Keynote de la WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Autres sessions de l’atelier @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Sessions associées",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Regardez l’événement spécial au Moscone Center à San Francisco (Californie).",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "L’événement est terminé et sera disponible en vidéo prochainement.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Revenez le @@DATE@@ @@MONTH@@ à @@HOUR24@@:@@MINUTE@@ (heure locale) pour regarder l’événement en direct.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Atelier",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Date",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Heure",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Lieu",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Aucun favori",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Ajoutez des sessions à vos favoris",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Suivant",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Cette diffusion est à présent terminée.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Keynote de la WWDC 2015 en direct",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Informations",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "La WWDC (Apple Worldwide Developers Conference) présente aux développeurs toutes les nouveautés d’iOS et d’OS X. Participez à plus de 100 sessions conduites par des ingénieurs d’Apple, obtenez l’aide de nos experts grâce à de nombreux ateliers pratiques, rencontrez des développeurs du monde entier et trouvez l’inspiration afin de concevoir des apps exceptionnelles. La WWDC se tient du 8 au 12 juin 2015, au Moscone West à San Francisco (Californie).",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Regarder les sessions",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Nous retransmettrons chaque jour des sessions en direct et proposerons les vidéos de toutes les sessions au cours de la semaine de conférence. Pour davantage d’informations, veuillez consulter developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Conditions d’utilisation",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Toutes les sessions de la WWDC sont protégées par droits d’auteur, Copyright © 2015 Apple Inc. Tous droits réservés, à l’usage exclusivement personnel et non commercial des développeurs. Toute autre utilisation de ces programmes est interdite sans l’autorisation écrite préalable d’Apple. Les informations et les technologies présentées sont sujettes à changement."
  },
  "it": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center (San Francisco)",
    "APPLE_EVENTS.WWDC2014_DATE": "2 giugno 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (fuso orario del Pacifico)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Evento speciale di Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Questo evento non è al momento disponibile per essere rivisto.",
    "APPLE_EVENTS.SECTION_HEADER": "Altri eventi",
    "APPLE_EVENTS.OCT2013_TITLE": "Evento speciale di Apple (ottobre 2013)",
    "APPLE_EVENTS.OCT2013_DESC": "Guarda Tim Cook, CEO della Apple, introdurre il nuovo iPad Air, iPad mini con Retina display, Mac Pro, OS X Mavericks e le app di nuova generazione iWork e iLife.",
    "APPLE_EVENTS.OCT2013_DATE": "22 ottobre 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Evento speciale di Apple (settembre 2013)",
    "APPLE_EVENTS.SEP2013_DESC": "Guarda Tim Cook, CEO della Apple, svelare l'iPhone 5s, iPhone 5c e altro ancora.",
    "APPLE_EVENTS.SEP2013_DATE": "10 settembre 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "Keynote WWDC 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "Guarda Tim Cook, CEO della Apple, svelare iOS 7, il nuovo Mac Pro, OS X Mavericks, il nuovo MacBook Air, iTunes Radio, iWork per iCloud beta, AirPort Time Capsule e altro ancora.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 giugno 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Evento speciale di Apple (ottobre 2012)",
    "APPLE_EVENTS.OCT2012_DESC": "Guarda Tim Cook, il CEO Apple, svelare il nuovo iPad mini, il nuovo iPad con display Retina, il nuovo iMac, il nuovo MacBook Pro 13\" con display Retina e altro ancora.",
    "APPLE_EVENTS.OCT2012_DATE": "23 ottobre 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Evento speciale di Apple (settembre 2012)",
    "APPLE_EVENTS.SEP2012_DESC": "Guarda Tim Cook, il CEO Apple, svelare il nuovo iPhone 5, il nuovo iPod touch, il nuovo iPod nano e altro ancora.",
    "APPLE_EVENTS.SEP2012_DATE": "12 settembre 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "Keynote WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Guarda il video in streaming del keynote WWDC 2012.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 giugno 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Ottobre 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Settembre 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Ottobre 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Settembre 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "In arrivo",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Esegui",
    "APPLE_EVENTS.COUNTER": "Inizia tra",
    "APPLE_EVENTS.WWDC2014_DESC": "Guarda Tim Cook, CEO della Apple, svelare iOS 8 e OS X Yosemite al WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Keynote WWDC 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Settembre 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (fuso orario del Pacifico)",
    "APPLE_EVENTS.SEP2014_DATE": "9 settembre 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Sintonizzati il 9 settembre alle ore 10:00 (fuso orario del Pacifico) per guardare questo evento in diretta.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@: @@HOURS@@: @@MINUTES@@: @@SECONDS@@",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, California",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Ottobre 2014",
    "APPLE_EVENTS.AM": "am",
    "APPLE_EVENTS.PM": "pm",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@ @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Set",
    "APPLE_EVENTS.SEPTEMBER_LONG": "Settembre",
    "APPLE_EVENTS.OCTOBER_SHORT": "Ott",
    "APPLE_EVENTS.OCTOBER_LONG": "Ottobre",
    "APPLE_EVENTS.JUNE_LONG": "giugno",
    "APPLE_EVENTS.SEP2014_DESC": "Dal lancio dell'Apple Watch all'arrivo dell'iPhone 6 e alla performance live degli U2, un evento che non puoi perdere.",
    "APPLE_EVENTS.SEP2014_TITLE": "Evento speciale Apple",
    "APPLE_EVENTS.MARCH_LONG": "Marzo",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Evento speciale Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts di San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Marzo 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Evento speciale di Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Evento speciale Apple: DIRETTA",
    "APPLE_EVENTS.OCT2014_TITLE": "Evento speciale Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Dai una prima occhiata all'iMac con display Retina 5K e all'iPad Air 2, scopri di più sull'uscita di OS X Yosemite e segui ogni istante dell'evento speciale presso la Town Hall del campus Apple.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Dai uno sguardo approfondito a Apple Watch, scopri con i tuoi occhi il nuovo MacBook e apprendi tutte le potenzialità di ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 giugno 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Programma",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Gruppi",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Preferiti",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Informazioni",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "In diretta",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Segna come già visto",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Segna come da guardare",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Segna tutti come già visti",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Segna tutti come da guardare",
    "APPLE_EVENTS.BUTTON_LIVE": "Guarda in diretta",
    "APPLE_EVENTS.BUTTON_ADD": "Aggiungi",
    "APPLE_EVENTS.BUTTON_REMOVE": "Rimuovi",
    "APPLE_EVENTS.WWDC2015_TITLE": "Keynote WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Altre sessioni in @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Sessioni simili",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Guarda l'evento speciale tenutosi al Moscone Center di San Francisco in California.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Questo evento è terminato e a breve sarà disponibile per essere rivisto.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Sintonizzati il @@DATE@@ @@MONTH@@ alle ore @@HOUR24@@:@@MINUTE@@ (fuso orario locale) per guardare questo evento in diretta.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Gruppo",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Data",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Ora",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Luogo",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Nessun preferito",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Aggiungi sessioni ai tuoi preferiti",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Successiva",
    "APPLE_EVENTS.WWDC2015_LIVE": "In diretta",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Lo streaming in diretta si è concluso.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Keynote WWDC 2015: in diretta",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Informazioni generali",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "L'Apple Worldwide Developers Conference (WWDC) offre agli sviluppatori una panoramica approfondita sulle ultime novità iOS e OS X. Puoi imparare e trovare l'ispirazione grazie a più di 100 sessioni dirette dagli ingegneri Apple, ricevere l'aiuto degli esperti Apple tramite un'ampia gamma di laboratori pratici e connetterti con colleghi sviluppatori provenienti da ogni parte del mondo, con l'opportunità di creare la tua migliore app di sempre. Il WWDC si terrà dall'8 al 12 giugno 2015 presso il Moscone West a San Francisco, in California.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Guardare le sessioni",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Trasmetteremo ogni giorno in streaming sessioni selezionate e pubblicheremo i video di tutte le sessioni della conferenza nel corso della settimana. Per ulteriori informazioni, visita il sito developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Termini d'uso",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Tutte le sessioni del WWDC sono copyright © di 2015 Apple Inc. Tutti i diritti riservati e disponibili per i nostri sviluppatori solo per uso personale, non commerciale. Ogni altro uso di queste trasmissioni è proibito senza previo consenso scritto di Apple. Le informazioni e le tecnologie descritte possono essere soggette a modifiche."
  },
  "es": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 de junio de 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (hora del Pacífico)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "El vídeo de este evento no está disponible en estos momentos.",
    "APPLE_EVENTS.SECTION_HEADER": "Otros eventos",
    "APPLE_EVENTS.OCT2013_TITLE": "Evento especial de Apple, octubre de 2013",
    "APPLE_EVENTS.OCT2013_DESC": "El CEO de Apple Tim Cook presenta el nuevo iPad Air, el iPad mini con pantalla Retina, el Mac Pro, OS X Mavericks y la siguiente generación de apps de iWork y iLife.",
    "APPLE_EVENTS.OCT2013_DATE": "22 de octubre de 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Evento especial de Apple, septiembre de 2013",
    "APPLE_EVENTS.SEP2013_DESC": "El CEO de Apple Tim Cook presenta el iPhone 5s, el iPhone 5c y más.",
    "APPLE_EVENTS.SEP2013_DATE": "10 de septiembre de 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "Presentación de la WWDC 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "El CEO de Apple Tim Cook presenta iOS 7, el nuevo Mac Pro, OS X Mavericks, el nuevo MacBook Air, iTunes Radio, la versión beta de iWork para iCloud, Airport Time Capsule y más.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 de junio de 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Evento especial de Apple, octubre de 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Tim Cook, consejero delegado de Apple, desvela los nuevos iPad mini, iPad con pantalla Retina, iMac, MacBook Pro de 13\" con pantalla Retina y mucho más.",
    "APPLE_EVENTS.OCT2012_DATE": "23 de octubre de 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Evento especial de Apple, septiembre de 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Tim Cook, consejero delegado de Apple, desvela los nuevos iPhone 5, iPod touch, iPod nano y mucho más.",
    "APPLE_EVENTS.SEP2012_DATE": "12 de septiembre de 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "Presentación de la WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Vídeo en streaming de la presentación de la WWDC 2012.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 de junio de 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Octubre 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Sept. 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Octubre 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Sept. 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Muy pronto",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Ver",
    "APPLE_EVENTS.COUNTER": "Empieza en",
    "APPLE_EVENTS.WWDC2014_DESC": "El CEO de Apple Tim Cook presenta iOS 8 y OS X Yosemite en el WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Presentación de la WWDC 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Sept. 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (hora del Pacífico)",
    "APPLE_EVENTS.SEP2014_DATE": "9 de septiembre de 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Puedes ver este evento en directo el 9 de septiembre a las 10:00 (hora del Pacífico).",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@min @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino (California)",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Octubre 2014",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ de @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ de @@MONTH@@ de @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Sep",
    "APPLE_EVENTS.SEPTEMBER_LONG": "Septiembre",
    "APPLE_EVENTS.OCTOBER_SHORT": "oct",
    "APPLE_EVENTS.OCTOBER_LONG": "octubre",
    "APPLE_EVENTS.JUNE_LONG": "junio",
    "APPLE_EVENTS.SEP2014_DESC": "El lanzamiento del Apple Watch, la llegada del iPhone 6 o la actuación en directo de U2. Un evento que no te puedes perder.",
    "APPLE_EVENTS.SEP2014_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.MARCH_LONG": "Marzo",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Marzo 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Evento especial de Apple – EN DIRECTO",
    "APPLE_EVENTS.OCT2014_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Echa un primer vistazo al iMac con pantalla Retina 5K y el iPad Air 2. Descubre el nuevo OS X Yosemite. Y sigue al completo el evento especial en el Town Hall del campus de Apple.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Echa un vistazo en profundidad al Apple Watch, disfruta la presentación del nuevo MacBook y descubre las innovaciones de ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 de junio de 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Programa",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Temas",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoritos",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Acerca de",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "En directo",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Marcar como visto",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Marcar como no visto",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Marcar todo como visto",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Marcar todo como no visto",
    "APPLE_EVENTS.BUTTON_LIVE": "Ver en directo",
    "APPLE_EVENTS.BUTTON_ADD": "Añadir",
    "APPLE_EVENTS.BUTTON_REMOVE": "Eliminar",
    "APPLE_EVENTS.WWDC2015_TITLE": "Presentación de la WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Otras sesiones en @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Sesiones relacionadas",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Disfruta del evento especial celebrado en el Moscone Center de San Francisco (California).",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Este evento ha terminado. El vídeo estará disponible muy pronto.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Puedes ver este evento en directo a las @@HOUR24@@:@@MINUTE@@ (hora local) del @@DATE@@ de @@MONTH@@.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Tema",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Fecha",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Hora",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Lugar",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "No hay favoritos",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Añade sesiones a tus favoritos",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Foco",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Siguiente",
    "APPLE_EVENTS.WWDC2015_LIVE": "En directo",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "La emisión en directo ha terminado.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Presentación de la WWDC 2015: en directo",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Información general",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "La Conferencia Mundial de Desarrolladores de Apple (WWDC) permite a los desarrolladores conocer en profundidad las últimas novedades de iOS y OS X. Puedes aprender e inspirarte en más de 100 sesiones dirigidas por ingenieros de Apple, obtener ayuda de nuestros expertos con una serie de sesiones prácticas y conectar con desarrolladores de todo el mundo. La WWDC te da la oportunidad de crear las mejores apps de tu vida. La conferencia tendrá lugar del 8 al 12 de junio en el Moscone West de San Francisco (California).",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Cómo ver las sesiones",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Emitiremos las sesiones en directo a diario y también podrás ver vídeos de todas ellas durante la semana de la conferencia. Consulta los detalles en developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Términos de uso",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Todas las sesiones de la WWDC están bajo el copyright © 2015 Apple Inc. Todos los derechos quedan reservados y son únicamente para uso personal y no comercial de nuestros desarrolladores. Cualquier otro uso de estas emisiones está prohibido sin permiso previo y por escrito de Apple. La información y las tecnologías aquí descritas están sujetas a cambios."
  },
  "nl": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 juni 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10.00 uur PDT",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple speciaal evenement",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Dit evenement is momenteel niet te bekijken.",
    "APPLE_EVENTS.SECTION_HEADER": "Andere evenementen",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple speciaal evenement - oktober 2013",
    "APPLE_EVENTS.OCT2013_DESC": "Zie hoe CEO Tim Cook van Apple de nieuwe iPad Air, iPad mini met Retina-display, Mac Pro, OS X Mavericks en de volgende generatie iWork- en iLife-apps introduceert.",
    "APPLE_EVENTS.OCT2013_DATE": "22 oktober 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple speciaal evenement - september 2013",
    "APPLE_EVENTS.SEP2013_DESC": "Bekijk de onthulling van de iPhone 5s, iPhone 5c en meer door Apple's CEO Tim Cook.",
    "APPLE_EVENTS.SEP2013_DATE": "10 september 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "Bekijk de onthulling van iOS 7, de nieuwe Mac Pro, OS X Mavericks, de nieuwe MacBook Air, iTunes Radio, iWork voor iCloud-bèta, AirPort Time Capsule en meer door Apple's CEO Tim Cook.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 juni 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple speciaal evenement - oktober 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Kijk hoe Tim Cook, CEO van Apple, de nieuwe iPad mini, nieuwe iPad met Retina-display, nieuwe iMac, nieuwe 13-inch MacBook Pro met Retina-display en meer onthult.",
    "APPLE_EVENTS.OCT2012_DATE": "23 oktober 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple speciaal evenement - september 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Kijk hoe Tim Cook, CEO van Apple, de nieuwe iPhone 5, nieuwe iPod touch, nieuwe iPod nano en meer onthult.",
    "APPLE_EVENTS.SEP2012_DATE": "12 september 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "Stream de video van de WWDC 2012 keynote.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 juni 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Oktober 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Oktober 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Binnenkort",
    "APPLE_EVENTS.BUTTON_TIME": "10.00 uur",
    "APPLE_EVENTS.BUTTON_PLAY": "Speel af",
    "APPLE_EVENTS.COUNTER": "Begint over",
    "APPLE_EVENTS.WWDC2014_DESC": "Zie hoe Apple's CEO Tim Cook iOS 8 en OS X Yosemite onthult op de WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "September 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10.00 uur (PDT)",
    "APPLE_EVENTS.SEP2014_DATE": "9 september 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Bekijk dit evenement live op 9 september om 10.00 uur PDT.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@u @@MINUTES@@m @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, Californië",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Oktober 2014",
    "APPLE_EVENTS.AM": "uur",
    "APPLE_EVENTS.PM": "uur",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@ @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@.@@MINUTE@@ uur",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "sep",
    "APPLE_EVENTS.SEPTEMBER_LONG": "september",
    "APPLE_EVENTS.OCTOBER_SHORT": "okt",
    "APPLE_EVENTS.OCTOBER_LONG": "oktober",
    "APPLE_EVENTS.JUNE_LONG": "juni",
    "APPLE_EVENTS.SEP2014_DESC": "De lancering van Apple Watch, de aankomst van iPhone 6 en een liveoptreden van U2 - dit evenement mag je niet missen.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple speciaal evenement",
    "APPLE_EVENTS.MARCH_LONG": "maart",
    "APPLE_EVENTS.MARCH_SHORT": "mrt",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple speciaal evenement",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Maart 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple speciaal evenement",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple speciaal evenement – LIVE",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple speciaal evenement",
    "APPLE_EVENTS.OCT2014_DESC": "Bekijk alvast de iMac met Retina 5K-display en iPad Air 2. Kom van alles te weten over de release van OS X Yosemite. En volg elk moment van het speciale evenement in het Town Hall-gebouw op de Apple-campus.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Kom alles te weten over Apple Watch, bekijk de lancering van de nieuwe MacBook, en leer meer over de innovaties in ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 juni 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Overzicht",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Tracks",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favorieten",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Over",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Live",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Markeer als bekeken",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Markeer als niet-bekeken",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Alles markeren als bekeken",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Alles markeren als niet-bekeken",
    "APPLE_EVENTS.BUTTON_LIVE": "Bekijk live",
    "APPLE_EVENTS.BUTTON_ADD": "Voeg toe",
    "APPLE_EVENTS.BUTTON_REMOVE": "Verwijder",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "Andere sessies in @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Gerelateerde sessies",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Bekijk het speciale evenement in het Moscone Center in San Francisco, Californië.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Dit evenement is afgelopen en binnenkort te bekijken.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Bekijk dit evenement live om @@HOUR24@@:@@MINUTE@@ (lokale tijd) op @@DATE@@ @@MONTH@@.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Track",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Datum",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Tijd",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Locatie",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Geen favorieten",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Voeg sessies toe aan je favorieten",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Volgende",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Deze livestream is afgelopen.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 keynote – LIVE",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Algemene informatie",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "De Apple Worldwide Developers Conference (WWDC) biedt ontwikkelaars een grondige blik op de nieuwste ontwikkelingen van iOS en OS X. Spijker je kennis bij en laat je inspireren in de meer dan 100 sessies onder leiding van Apple engineers. Of vraag advies aan Apple experts tijdens de vele praktische trainingen en leg contact met andere ontwikkelaars uit de hele wereld. Alles om je beste apps ooit te maken. De WWDC wordt dit jaar gehouden van 8 – 12 juni in Moscone West, San Francisco, Californië.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Sessies bekijken",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Volg elke dag de livestreams van geselecteerde sessies en bekijk de geposte video's van de hele conferentieweek. Ga voor meer informatie naar developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Gebruiksvoorwaarden",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Copyright © 2015 Apple Inc. Alle rechten voorbehouden.\r\n\r\nHet is niet toegestaan om deze content te kopiëren, aan te passen, te (her)distribueren of te (her)coderen zonder voorafgaande schriftelijke toestemming van Apple, tenzij wettelijk anders bepaald. De hier beschreven informatie en technologieën kunnen worden gewijzigd."
  },
  "ja": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "サンフランシスコ Moscone Center",
    "APPLE_EVENTS.WWDC2014_DATE": "2014年6月3日（日本時間）",
    "APPLE_EVENTS.WWDC2014_TIME": "午前2時",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple スペシャルイベント",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "現在このイベントはご覧になれません。",
    "APPLE_EVENTS.SECTION_HEADER": "その他のイベント",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple スペシャルイベント - 2013年10月",
    "APPLE_EVENTS.OCT2013_DESC": "Apple の CEO ティム・クックによる、新しい iPad Air、 iPad mini Retina ディスプレイモデル、Mac Pro、 OS X Mavericks、次世代 iWork および iLife アプリケーションの発表をチェックしよう。",
    "APPLE_EVENTS.OCT2013_DATE": "2013年10月22日",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple スペシャルイベント - 2013年9月",
    "APPLE_EVENTS.SEP2013_DESC": "Apple の CEO、ティム・クックが iPhone 5s、iPhone 5c などを発表。",
    "APPLE_EVENTS.SEP2013_DATE": "2013年9月10日",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 Keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "Apple の CEO ティム・クックが iOS 7、新しい Mac Pro、 OS X Mavericks、新しい MacBook Air、iTunes Radio、 iWork for iCloud beta、AirMac Time Capsule などを発表。",
    "APPLE_EVENTS.WWDC2013_DATE": "2013年6月10日",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple スペシャルイベント - 2012年10月",
    "APPLE_EVENTS.OCT2012_DESC": "Apple の CEO、Tim Cook が紹介する iPad mini、iPad Retinaディスプレイ、iMac、13インチの MacBook Pro Retinaディスプレイモデルなどをチェックしよう。",
    "APPLE_EVENTS.OCT2012_DATE": "2012年10月23日",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple スペシャルイベント - 2012年9月",
    "APPLE_EVENTS.SEP2012_DESC": "Apple の CEO、Tim Cook が紹介する iPhone 5、iPod touch、iMac、iPod nano などをチェックしよう。",
    "APPLE_EVENTS.SEP2012_DATE": "2012年9月12日",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 Keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "WWDC 2012 Keynote のイベント映像を視聴しよう。",
    "APPLE_EVENTS.WWDC2012_DATE": "2012年6月11日",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "2013年10月",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "2013年9月",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "2012年10月",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "2012年9月",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "近日発表",
    "APPLE_EVENTS.BUTTON_TIME": "午前2時",
    "APPLE_EVENTS.BUTTON_PLAY": "再生",
    "APPLE_EVENTS.COUNTER": "イベント開始まで",
    "APPLE_EVENTS.WWDC2014_DESC": "Apple の CEO ティム・クックが WWDC 2014 で iOS 8 と OS X Yosemite を発表。",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 Keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "2014年9月",
    "APPLE_EVENTS.SEP2014_TIME": "午前2時（日本時間）",
    "APPLE_EVENTS.SEP2014_DATE": "2014年9月10日（日本時間）",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "9月10日午前2時（日本時間）開催予定のスペシャルイベントをリアルタイムで視聴しよう。",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@日@@HOURS@@時@@MINUTES@@分@@SECONDS@@秒",
    "APPLE_EVENTS.OCT2014_LOCATION": "カリフォルニア州 クパティーノ",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "2014年10月",
    "APPLE_EVENTS.AM": "AM",
    "APPLE_EVENTS.PM": "PM",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@MONTH@@@@DATE@@日",
    "APPLE_EVENTS.DATE_FORMAT": "@@YEAR@@年@@MONTH@@@@DATE@@日",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR12@@:@@MINUTE@@ @@AMPM@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "9月",
    "APPLE_EVENTS.SEPTEMBER_LONG": "9月",
    "APPLE_EVENTS.OCTOBER_SHORT": "10月",
    "APPLE_EVENTS.OCTOBER_LONG": "10月",
    "APPLE_EVENTS.JUNE_LONG": "6月",
    "APPLE_EVENTS.SEP2014_DESC": "Apple Watch の発表。iPhone 6 のデビュー。 そして U2 のライブパフォーマンス。 見逃せないイベントです。",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple スペシャルイベント",
    "APPLE_EVENTS.MARCH_LONG": "3月",
    "APPLE_EVENTS.MARCH_SHORT": "3月",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple スペシャルイベント",
    "APPLE_EVENTS.MAR2015_LOCATION": "サンフランシスコ Yerba Buena Center for the Arts",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "2015年3月",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple スペシャルイベント",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple スペシャルイベント – ライブ",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple スペシャルイベント",
    "APPLE_EVENTS.OCT2014_DESC": "リリースされたばかりの OS X Yosemite や、新しく登場した iMac Retina 5Kディスプレイモデルと iPad Air 2 の詳細をチェック。さらに Apple 本社内の Town Hall で行われたスペシャルイベントを視聴しよう。",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Apple Watch の詳細、新しい MacBook 、そして ResearchKit の革新的な新機能を\r\nチェックしよう。",
    "APPLE_EVENTS.WWDC2015_DATE": "2015年6月8日",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "スケジュール",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "トラック",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "お気に入り",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "WWDC 2015 について",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "ライブ",
    "APPLE_EVENTS.MARK_AS_WATCHED": "視聴済みに設定",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "未視聴に設定",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "全てを視聴済みに設定",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "全てを未視聴に設定",
    "APPLE_EVENTS.BUTTON_LIVE": "リアルタイムで視聴",
    "APPLE_EVENTS.BUTTON_ADD": "追加",
    "APPLE_EVENTS.BUTTON_REMOVE": "削除",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 Keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "@@TRACK@@のその他のセッション",
    "APPLE_EVENTS.RELATED_SESSIONS": "関連セッション",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "カリフォルニア州サンフランシスコの Moscone Center で行われたスペシャルイベントを視聴しよう。",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "このイベントは終了しました。間もなくストリーミングで視聴いただけます。",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "@@MONTH@@@@DATE@@日 @@HOUR12@@:@@MINUTE@@ @@AMPM@@（日本時間）開催予定のスペシャルイベントをリアルタイムで視聴しよう。",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "トラック",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "日付",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "時刻",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "場所",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "お気に入りがありません",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "好きなセッションをお気に入りに追加してください",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "フォーカス",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "次へ",
    "APPLE_EVENTS.WWDC2015_LIVE": "ライブ",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "このライブストリームは終了しました",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Keynote – ライブ",
    "APPLE_EVENTS.WWDC2015_LOCATION": "サンフランシスコ Moscone Center",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "一般情報",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "Apple の Worldwide Developers Conference（WWDC）は iOS と OS X の最新機能をデベロッパに紹介する、グローバル・カンファレンスです。Apple のエンジニアが主催する100以上のセッションから学んだり、Apple のエキスパートと共にラボなどを体験することができます。さらに、世界中のデベロッパ達とのコミュニケーションを図ることによって、より良質な App の開発が可能となります。WWDC は2015年6月8日から12日まで、サンフランシスコの Moscone West にて開催されます。",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "セッションの視聴",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "厳選されたセッションのライブストリームが、毎日リアルタイムで配信されます。さらに、WWDC の期間中はすべてのセッションが終了後にアップロードされます。詳しい情報は developer.apple.com/wwdc を参照してください。",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "利用規約",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. All rights reserved. \r\n\r\nApple の許可を得ずに複製、編集、転送、再掲載、エンコーディングなどを行う事は禁止されています。記載されている情報や技術は、変更される可能性があります。"
  },
  "ru": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, Сан-Франциско",
    "APPLE_EVENTS.WWDC2014_DATE": "2 июня 2014 г.",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (по тихоокеанскому времени)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Специальная презентация Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Запись сейчас недоступна для просмотра.",
    "APPLE_EVENTS.SECTION_HEADER": "Другие мероприятия",
    "APPLE_EVENTS.OCT2013_TITLE": "Презентация Apple — октябрь 2013 года",
    "APPLE_EVENTS.OCT2013_DESC": "Генеральный директор Apple Тим Кук представляет новые iPad Air, iPad mini с дисплеем Retina, Mac Pro, OS X Mavericks и приложения нового поколения iWork и iLife. Смотрите презентацию.",
    "APPLE_EVENTS.OCT2013_DATE": "22 октября 2013 г.",
    "APPLE_EVENTS.SEP2013_TITLE": "Презентация Apple — сентябрь 2013 года",
    "APPLE_EVENTS.SEP2013_DESC": "Генеральный директор Apple Тим Кук представляет iPhone 5s, iPhone 5c и многое другое. Смотрите презентацию.",
    "APPLE_EVENTS.SEP2013_DATE": "10 сентября 2013 г.",
    "APPLE_EVENTS.WWDC2013_TITLE": "Презентация на WWDC 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "Генеральный директор Apple Тим Кук представляет iOS 7, OS X Mavericks, новые Mac Pro и MacBook Air, iTunes Radio, бета-версию iWork для iCloud, AirPort Time Capsule и другое. Смотрите презентацию.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 июня 2013 г.",
    "APPLE_EVENTS.OCT2012_TITLE": "Презентация Apple — октябрь 2012 года",
    "APPLE_EVENTS.OCT2012_DESC": "Смотрите выступление генерального директора Apple Тима Кука, в ходе которого были представлены новый iPad mini, новый iPad c дисплеем Retina, новый iMac, новый 13-дюймовый MacBook Pro с дисплеем Retina и многое другое.",
    "APPLE_EVENTS.OCT2012_DATE": "23 октября 2012 г.",
    "APPLE_EVENTS.SEP2012_TITLE": "Презентация Apple — сентябрь 2012 года",
    "APPLE_EVENTS.SEP2012_DESC": "Смотрите выступление генерального директора Apple Тима Кука, в ходе которого были представлены новый iPhone 5, новый iPod touch, новый iPod nano и многое другое.",
    "APPLE_EVENTS.SEP2012_DATE": "12 сентября 2012 г.",
    "APPLE_EVENTS.WWDC2012_TITLE": "Презентация на WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Смотрите запись презентации на WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DATE": "11 июня 2012 г.",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Октябрь 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Сентябрь 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Октябрь 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Сентябрь 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Скоро",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Просмотр",
    "APPLE_EVENTS.COUNTER": "Начало через",
    "APPLE_EVENTS.WWDC2014_DESC": "Генеральный директор Apple Тим Кук представляет iOS 8 и OS X Yosemite на WWDC 2014. Смотрите презентацию.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Презентация на WWDC 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Сентябрь 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (по тихоокеанскому времени)",
    "APPLE_EVENTS.SEP2014_DATE": "9 сентября 2014 г.",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Купертино",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Смотрите прямую трансляцию 9 сентября в 10:00 (по тихоокеанскому времени).",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@:@@HOURS@@:@@MINUTES@@:@@SECONDS@@",
    "APPLE_EVENTS.OCT2014_LOCATION": "Купертино, штат Калифорния",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Октябрь 2014",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@ @@YEAR@@ г.",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "cент.",
    "APPLE_EVENTS.SEPTEMBER_LONG": "сентября",
    "APPLE_EVENTS.OCTOBER_SHORT": "окт.",
    "APPLE_EVENTS.OCTOBER_LONG": "октября",
    "APPLE_EVENTS.JUNE_LONG": "июня",
    "APPLE_EVENTS.SEP2014_DESC": "Представление Apple Watch и iPhone 6, а также живое выступление U2 – такое событие нельзя пропустить.",
    "APPLE_EVENTS.SEP2014_TITLE": "Специальное мероприятие Apple",
    "APPLE_EVENTS.MARCH_LONG": "марта",
    "APPLE_EVENTS.MARCH_SHORT": "мар.",
    "APPLE_EVENTS.MAR2015_TITLE": "Специальное мероприятие Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, Сан-Франциско",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Март 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Специальное мероприятие Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Специальное мероприятие Apple: прямой эфир",
    "APPLE_EVENTS.OCT2014_TITLE": "Презентация Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Приглашаем Вас посмотреть презентацию, которая состоялась в конференц-зале Town Hall штаб-квартиры Apple. Вас ждет знакомство с iPad Air 2 и iMac с дисплеем Retina 5K, а также уникальная возможность получить подробные сведения о новой OS X Yosemite.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Узнайте все об Apple Watch, посмотрите презентацию новой версии MacBook и познакомьтесь с инновационной платформой ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 июня 2015 г.",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Презентация",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Расписание",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Категории",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Избранное",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "О конференции",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Прямой эфир",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Отметить как просмотренное",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Отметить как непросмотренное",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Отметить все как просмотренное",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Отметить все как непросмотренное",
    "APPLE_EVENTS.BUTTON_LIVE": "Смотреть прямой эфир",
    "APPLE_EVENTS.BUTTON_ADD": "Добавить",
    "APPLE_EVENTS.BUTTON_REMOVE": "Удалить",
    "APPLE_EVENTS.WWDC2015_TITLE": "Презентация на WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Другие сессии в категории «@@TRACK@@»",
    "APPLE_EVENTS.RELATED_SESSIONS": "Похожие сессии",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Смотрите специальное мероприятие, которое состоялось в Moscone Center в Сан-Франциско, штат Калифорния.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Презентация закончилась. Запись скоро будет доступна для просмотра.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Смотрите прямую трансляцию @@DATE@@ @@MONTH@@ в @@HOUR24@@:@@MINUTE@@ (по местному времени).",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Категория",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Дата",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Время",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Место",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Нет избранных",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Добавьте сессии в избранное",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Тема",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Далее",
    "APPLE_EVENTS.WWDC2015_LIVE": "Прямой эфир",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Прямая трансляция завершена",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Презентация на WWDC 2015: прямой эфир",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, Сан-Франциско",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Общая информация",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "На Всемирной конференции разработчиков Apple (WWDC) будут подробно представлены последние версии iOS и OS X. Вас ждут более 100 сессий под руководством инженеров Apple, практические семинары с экспертами компании, а также знакомства с разработчиками из других стран. Вы получите все ресурсы для того, чтобы создать свое лучшее приложение. WWDC пройдет с 8 по 12 июня в центре Moscone West в Сан-Франциско, штат Калифорния.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Просмотр сессий",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Мы будем ежедневно транслировать избранные сессии в прямом эфире, а также выкладывать записи всех сессий конференции. Подробнее на сайте developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Условия использования",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. Все права защищены.\r\nЗапрещается копирование, изменение, распространение, трансляция и перекодирование данных материалов без предварительного письменного согласия Apple, за исключением случаев, предусмотренных законодательством. Описанные технологии, а также иные приведенные в материалах сведения могут быть изменены."
  },
  "tr": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 Haziran 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (PST)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple Özel Etkinliği",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Bu etkinlik şu an görüntülenemiyor.",
    "APPLE_EVENTS.SECTION_HEADER": "Diğer Etkinlikler",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple Özel Etkinliği - Ekim 2013",
    "APPLE_EVENTS.OCT2013_DESC": "Apple CEO’su Tim Cook'un yeni iPad Air, Retina ekranlı iPad mini, Mac Pro, OS X Mavericks ve yeni nesil iWork ve iLife uygulamalarını açıkladığı sunumu izleyin.",
    "APPLE_EVENTS.OCT2013_DATE": "22 Ekim 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple Özel Etkinliği - Eylül 2013",
    "APPLE_EVENTS.SEP2013_DESC": "Apple CEO’su Tim Cook’un iPhone 5s, iPhone 5c ve daha fazlasını açıkladığı sunumu izleyin.",
    "APPLE_EVENTS.SEP2013_DATE": "10 Eylül 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 Açılış Konuşması",
    "APPLE_EVENTS.WWDC2013_DESC": "Apple CEO’su Tim Cook’un iOS 7, yeni Mac Pro, OS X Mavericks, yeni MacBook Air, iTunes Radio, iCloud için iWork beta, AirPort Time Capsule ve daha fazlasını açıkladığı sunumu izleyin.\r\n ",
    "APPLE_EVENTS.WWDC2013_DATE": "10 Haziran 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple Özel Etkinliği - Ekim 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Apple CEO'su Tim Cook'un yeni iPad mini, yeni Retina ekranlı iPad, yeni iMac, yeni Retina ekranlı 13\" MacBook Pro ve daha fazlasını tanıttığı konuşmasını izleyin.",
    "APPLE_EVENTS.OCT2012_DATE": "23 Ekim 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple Özel Etkinliği - Eylül 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Apple CEO'su Tim Cook'un yeni iPhone 5, yeni iPod touch, yeni iPod nano ve daha fazlasını tanıttığı konuşmasını izleyin.",
    "APPLE_EVENTS.SEP2012_DATE": "12 Eylül 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 Açılış Konuşması",
    "APPLE_EVENTS.WWDC2012_DESC": "WWDC 2012 açılış konuşmasının videosunu izleyin.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 Haziran 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Ekim 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Eylül 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Ekim 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Eylül 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Yakında",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Oynat",
    "APPLE_EVENTS.COUNTER": "Başlangıç:",
    "APPLE_EVENTS.WWDC2014_DESC": "Apple CEO’su Tim Cook’un iOS 8 ve OS X Yosemite’yi açıkladığı WWDC 2014’teki sunumu izleyin.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 Açılış Konuşması",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Eylül 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (PST)",
    "APPLE_EVENTS.SEP2014_DATE": "9 Eylül 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "9 Eylül saat 10:00’daki (PST) bu etkinliği canlı izleyin.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@:@@HOURS@@:@@MINUTES@@:@@SECONDS@@",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, Kaliforniya",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Ekim 2014",
    "APPLE_EVENTS.AM": "ÖÖ",
    "APPLE_EVENTS.PM": "ÖS",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@ @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Eyl",
    "APPLE_EVENTS.SEPTEMBER_LONG": "Eylül",
    "APPLE_EVENTS.OCTOBER_SHORT": "Eki",
    "APPLE_EVENTS.OCTOBER_LONG": "Ekim",
    "APPLE_EVENTS.JUNE_LONG": "Haziran",
    "APPLE_EVENTS.SEP2014_DESC": "Apple Watch ve iPhone 6’in açıklandığı sunumu ve U2’nun canlı performansını içeren bu etkinlik mutlaka izlenmeli.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple Özel Etkinliği",
    "APPLE_EVENTS.MARCH_LONG": "Mart",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple Özel Etkinliği",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Mart 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple Özel Etkinliği",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple Özel Etkinliği – CANLI",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple Özel Etkinliği",
    "APPLE_EVENTS.OCT2014_DESC": "Retina 5K ekranlı iMac’e ve iPad Air 2’ye ilk kez göz atın. OS X Yosemite sürümü hakkında bilgi edinin. Ayrıca, Apple kampüsünde Town Hall’da gerçekleştirilen özel etkinliğin her anını takip edin.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Apple Watch’u daha yakından inceleyin, yeni MacBook’la tanışın ve ResearchKit’teki yenilikler hakkında bilgi edinin.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 Haziran 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Açılış Konuşması",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Program",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Konular",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoriler",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Hakkında",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Canlı",
    "APPLE_EVENTS.MARK_AS_WATCHED": "İzlendi olarak işaretle",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "İzlenmedi olarak işaretle",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Tümünü izlendi olarak işaretle",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Tümünü izlenmedi olarak işaretle",
    "APPLE_EVENTS.BUTTON_LIVE": "Canlı İzle",
    "APPLE_EVENTS.BUTTON_ADD": "Ekle",
    "APPLE_EVENTS.BUTTON_REMOVE": "Kaldır",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 Açılış Konuşması",
    "APPLE_EVENTS.OTHER_SESSIONS": "@@TRACK@@ ile İlgili Diğer Oturumlar",
    "APPLE_EVENTS.RELATED_SESSIONS": "İlgili Oturumlar",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Kaliforniya eyaletinin San Francisco şehrindeki Moscone Center’da düzenlenen özel etkinliği izleyin.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Bu etkinlik sona erdi, kısa bir süre sonra izleyebilirsiniz.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Bu etkinliği @@DATE@@ @@MONTH@@ tarihinde yerel saatiniz ile @@HOUR24@@:@@MINUTE@@ itibarıyla canlı olarak izleyebilirsiniz.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Konu",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Tarih",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Saat",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Yer",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Hiç Favoriniz Yok",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Lütfen favorilerinize oturum ekleyin.",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Odak Noktası",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Sırada",
    "APPLE_EVENTS.WWDC2015_LIVE": "Canlı",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Bu canlı yayın sona ermiştir",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Açılış Konuşması - CANLI",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Genel Bilgi",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "Apple Dünya Geliştiriciler Konferansı (WWDC) geliştiricilere iOS ve OS X’teki en son yeniliklere kapsamlı bir bakış olanağı sağlar. Apple mühendislerinin yönetimindeki 100’den fazla oturumdan ilham alıp bilgi edinebilir, uygulamalı ve geniş çaplı laboratuvar çalışmalarında Apple uzmanlarından yardım alabilir, dünyanın dört bir yanından geliştiricilerle tanışabilir ve bu sayede de gelmiş geçmiş en iyi uygulamalarınızı oluşturabilirsiniz. WWDC, 8-12 Haziran 2015 tarihleri arasında Kaliforniya’nın San Francisco Şehri’nde bulunan Moscone West’te düzenlenecektir.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Oturumları Görüntüleme",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Konferans haftası boyunca tüm oturumların videolarını yayınlayacağız ve ayrıca her gün sizin için seçtiğimiz oturumları canlı olarak izleyebileceksiniz. Ayrıntılı bilgi için lütfen developer.apple.com/wwdc adresini ziyaret edin.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Kullanım Koşulları",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. Tüm Hakları Saklıdır.\r\n\r\nBu içeriğin kopyalanması, modifiye edilmesi, yeniden dağıtılması, yeniden yayınlanması veya yeniden kodlanması Apple’ın önceden yazılı izni olmadan yasaktır. Burada belirtilen bilgi ve teknolojiler değişebilir."
  },
  "pt": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, em São Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 de junho de 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10h (horário do Pacífico)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC de 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Evento especial da Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "No momento este evento pode não estar disponível para visualização.",
    "APPLE_EVENTS.SECTION_HEADER": "Outros eventos",
    "APPLE_EVENTS.OCT2013_TITLE": "Evento especial da Apple: outubro de 2013",
    "APPLE_EVENTS.OCT2013_DESC": "O CEO da Apple Tim Cook apresenta o novo iPad Air, iPad mini com tela Retina, Mac Pro, OS X Mavericks e a próxima geração dos apps iWork e iLife.",
    "APPLE_EVENTS.OCT2013_DATE": "22 de outubro de 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Evento especial da Apple: setembro de 2013",
    "APPLE_EVENTS.SEP2013_DESC": "O CEO da Apple Tim Cook revela o iPhone 5s, iPhone 5c e mais.",
    "APPLE_EVENTS.SEP2013_DATE": "10 de setembro de 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "Apresentação da conferência WWDC de 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "O CEO da Apple Tim Cook revela o iOS 7, o novo Mac Pro, OS X Mavericks, o novo MacBook Air, iTunes Radio, iWork para iCloud beta, AirPort Time Capsule e mais.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 de junho de 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Evento especial da Apple: outubro de 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Veja o CEO da Apple Tim Cook apresentar o novo iPad mini, o novo iPad com tela Retina, o novo iMac, o novo MacBook Pro de 13 polegadas com tela Retina e muito mais.",
    "APPLE_EVENTS.OCT2012_DATE": "23 de outubro de 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Evento especial da Apple: setembro de 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Veja o CEO da Apple Tim Cook apresentar o novo iPhone 5, o novo iPod touch, o novo iPod nano e muito mais.",
    "APPLE_EVENTS.SEP2012_DATE": "12 de setembro de 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "Apresentação da conferência WWDC de 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Assista à conferência WWDC de 2012 via streaming.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 de junho de 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Outubro 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Setembro 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Outubro 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Setembro 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Em breve",
    "APPLE_EVENTS.BUTTON_TIME": "10h",
    "APPLE_EVENTS.BUTTON_PLAY": "Reproduzir",
    "APPLE_EVENTS.COUNTER": "Começa em",
    "APPLE_EVENTS.WWDC2014_DESC": "O CEO da Apple Tim Cook revela o iOS 8 e OS X Yosemite na conferência WWDC de 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Apresentação da conferência WWDC de 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Setembro 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10h (horário do Pacífico)",
    "APPLE_EVENTS.SEP2014_DATE": "9 de setembro de 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Fique ligado às 14h do dia 9 de setembro para assistir a este evento ao vivo.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@min @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, Califórnia",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Outubro 2014",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ de @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ de @@MONTH@@ de @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "set",
    "APPLE_EVENTS.SEPTEMBER_LONG": "setembro",
    "APPLE_EVENTS.OCTOBER_SHORT": "out",
    "APPLE_EVENTS.OCTOBER_LONG": "outubro",
    "APPLE_EVENTS.JUNE_LONG": "Junho",
    "APPLE_EVENTS.SEP2014_DESC": "O lançamento do Apple Watch, a chegada do iPhone 6 e a apresentação ao vivo do U2. Um evento que você não pode perder.",
    "APPLE_EVENTS.SEP2014_TITLE": "Evento especial da Apple",
    "APPLE_EVENTS.MARCH_LONG": "março",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Evento especial da Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, em São Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Março 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Evento especial da Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Evento especial da Apple – AO VIVO",
    "APPLE_EVENTS.OCT2014_TITLE": "Evento especial da Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Conheça em primeira mão os novos iMac com tela Retina 5K e iPad Air 2. Saiba mais sobre o lançamento do OS X Yosemite. Além disso, acompanhe cada momento do evento especial no Town Hall, no Apple Campus.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Conheça e saiba mais sobre o Apple Watch, veja o novo MacBook e saiba mais sobre as inovações no ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 de junho de 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Programação",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Temas",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoritos",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Sobre",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Ao vivo",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Marcar como assistido",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Marcar como não assistido",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Marcar todos como assistidos",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Marcar todos como não assistidos",
    "APPLE_EVENTS.BUTTON_LIVE": "Assistir ao vivo",
    "APPLE_EVENTS.BUTTON_ADD": "Adicionar",
    "APPLE_EVENTS.BUTTON_REMOVE": "Remover",
    "APPLE_EVENTS.WWDC2015_TITLE": "Keynote da WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Outras sessões em  @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Sessões relacionadas",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Assista ao evento especial no Moscone Center em São Francisco, na Califórnia.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Este evento terminou e estará disponível para ser visualizado em breve.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Assista a este evento ao vivo às @@HOUR24@@:@@MINUTE@@ (horário local) do dia @@DATE@@ de @@MONTH@@.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Tema",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Data",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Hora",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Local",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Sem favoritos",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Adicione sessões a seus favoritos",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Foco",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Próximo",
    "APPLE_EVENTS.WWDC2015_LIVE": "Ao vivo",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Este streaming ao vivo já terminou.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Keynote da WWDC 2015: AO VIVO",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, em São Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Informações gerais",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "A Conferência Mundial de Desenvolvedores da Apple (WWDC) apresenta uma visão aprofundada sobre as últimas novidades do iOS e OS X. Ao longo de mais de 100 sessões dadas por engenheiros da Apple, você pode aprender e se inspirar, obter conselhos e dicas dos especialistas da Apple em sessões práticas e ter contato com desenvolvedores do mundo inteiro. Esta é a oportunidade perfeita para criar os melhores apps de sempre. A WWDC acontece de 8 a 12 de junho, no Moscone West em São Francisco, na Califórnia.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Visualização de sessões",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Sessões selecionadas serão transmitidas ao vivo via streaming e os vídeos de todas as sessões serão publicados ao longo da semana em que acontece a conferência. Para mais informações, acesse a página developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Termos de Uso",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Copyright © 2105 Apple Inc. Todos os direitos reservados.\r\n\r\nNão é permitido copiar, modificar, redistribuir, retransmitir ou recodificar este material sem o consentimento prévio por escrito da Apple, exceto quando permitido por lei. As informações e tecnologias descritas estão sujeitas a mudanças."
  },
  "en-GB": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 June, 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (Pacific)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple Special Event",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "This event is currently not available for viewing.",
    "APPLE_EVENTS.SECTION_HEADER": "Other Events",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple Special Event - October 2013",
    "APPLE_EVENTS.OCT2013_DESC": "See Apple CEO Tim Cook introduce the new iPad Air, iPad mini with Retina display, Mac Pro, OS X Mavericks and next-generation iWork and iLife apps.",
    "APPLE_EVENTS.OCT2013_DATE": "22 October, 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple Special Event - September 2013",
    "APPLE_EVENTS.SEP2013_DESC": "See Apple CEO Tim Cook unveil the iPhone 5s, iPhone 5c and more.",
    "APPLE_EVENTS.SEP2013_DATE": "10 September, 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 Keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "See Apple CEO Tim Cook unveil iOS 7, the new Mac Pro, OS X Mavericks, the new MacBook Air, iTunes Radio, iWork for iCloud beta, AirPort Time Capsule and more.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 June, 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple Special Event - October 2012",
    "APPLE_EVENTS.OCT2012_DESC": "See Apple CEO Tim Cook unveil the new iPad mini, the new iPad with Retina display, the new iMac, the new 13\" MacBook Pro with Retina display and more.",
    "APPLE_EVENTS.OCT2012_DATE": "23 October, 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple Special Event - September 2012",
    "APPLE_EVENTS.SEP2012_DESC": "See Apple CEO Tim Cook unveil the new iPhone 5, the new iPod touch, the new iPod nano and more.",
    "APPLE_EVENTS.SEP2012_DATE": "12 September, 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 Keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "See the streaming video from the WWDC 2012 keynote.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 June, 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "October 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "October 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Coming Soon",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Play",
    "APPLE_EVENTS.COUNTER": "Starts in",
    "APPLE_EVENTS.WWDC2014_DESC": "See Apple CEO Tim Cook unveil iOS 8 and OS X Yosemite at WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 Keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "September 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (Pacific)",
    "APPLE_EVENTS.SEP2014_DATE": "9 September, 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Tune in at 10:00 (Pacific) on 9 September to watch this event live.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@m @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, California",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "October 2014",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@, @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Sep",
    "APPLE_EVENTS.SEPTEMBER_LONG": "September",
    "APPLE_EVENTS.OCTOBER_SHORT": "Oct",
    "APPLE_EVENTS.OCTOBER_LONG": "October",
    "APPLE_EVENTS.JUNE_LONG": "June",
    "APPLE_EVENTS.SEP2014_DESC": "From the launch of Apple Watch to the arrival of iPhone 6 to a live performance from U2, this is an event not to be missed.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MARCH_LONG": "March",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "March 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple Special Event – LIVE",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.OCT2014_DESC": "Get a first look at iMac with Retina 5K display and iPad Air 2. Learn about the release of OS X Yosemite. And follow every moment of the special event at Town Hall on the Apple campus.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Get an in-depth look at Apple Watch, witness the unveiling of the new MacBook and learn about the innovations in ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 June, 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Schedule",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Tracks",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favourites",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "About",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Live",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Mark as watched",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Mark as unwatched",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Mark all as watched",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Mark as unwatched",
    "APPLE_EVENTS.BUTTON_LIVE": "Watch Live",
    "APPLE_EVENTS.BUTTON_ADD": "Add",
    "APPLE_EVENTS.BUTTON_REMOVE": "Remove",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 Keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "Other Sessions in @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Related Sessions",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Watch the special event held at the Moscone Center in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "This event has concluded and will be available for viewing shortly.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Tune in at @@HOUR24@@:@@MINUTE@@ (local time) on @@DATE@@ @@MONTH@@ to watch this event live.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Track",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Date",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Time",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Location",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "No Favourites",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Please add sessions to your favourites.",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Next",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "This live stream has ended.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Keynote—LIVE",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "General Information",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "The Apple Worldwide Developers Conference (WWDC) gives developers an in-depth look at the latest in iOS and OS X. You can learn from and be inspired by more than 100 sessions led by Apple engineers, get help from Apple experts through an extensive set of hands-on labs and connect with fellow developers from around the world, giving you the opportunity to create your best apps ever. WWDC takes place 8 – 12 June, 2015 at Moscone West in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Viewing Sessions",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "We’ll be live streaming select sessions daily and posting videos of all sessions throughout the week of the conference. For more information please visit developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Terms of Use",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. All Rights Reserved.\r\n\r\nYou are prohibited from copying, modifying, redistributing, rebroadcasting or re-encoding this content without prior written permission from Apple, except as may be permitted by law. The information and technologies described within are subject to change."
  },
  "en": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "June 2, 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 a.m. (Pacific)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple Special Event",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "This event is currently not available for viewing.",
    "APPLE_EVENTS.SECTION_HEADER": "Other Events",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple Special Event - October 2013",
    "APPLE_EVENTS.OCT2013_DESC": "See Apple CEO Tim Cook introduce the new iPad Air, iPad mini with Retina display, Mac Pro, OS X Mavericks, and next-generation iWork and iLife apps.",
    "APPLE_EVENTS.OCT2013_DATE": "October 22, 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple Special Event - September 2013",
    "APPLE_EVENTS.SEP2013_DESC": "See Apple CEO Tim Cook unveil the iPhone 5s, iPhone 5c, and more.",
    "APPLE_EVENTS.SEP2013_DATE": "September 10, 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 Keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "See Apple CEO Tim Cook unveil iOS 7, the new Mac Pro, OS X Mavericks, the new MacBook Air, iTunes Radio, iWork for iCloud beta, AirPort Time Capsule, and more.",
    "APPLE_EVENTS.WWDC2013_DATE": "June 10, 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple Special Event - October 2012",
    "APPLE_EVENTS.OCT2012_DESC": "See Apple CEO Tim Cook unveil the new iPad mini, the new iPad with Retina display, the new iMac, the new 13\" MacBook Pro with Retina display, and more.",
    "APPLE_EVENTS.OCT2012_DATE": "October 23, 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple Special Event - September 2012",
    "APPLE_EVENTS.SEP2012_DESC": "See Apple CEO Tim Cook unveil the new iPhone 5, the new iPod touch, the new iPod nano, and more.",
    "APPLE_EVENTS.SEP2012_DATE": "September 12, 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 Keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "See the streaming video from the WWDC 2012 keynote.",
    "APPLE_EVENTS.WWDC2012_DATE": "June 11, 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "October 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "October 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Coming Soon",
    "APPLE_EVENTS.BUTTON_TIME": "10:00 a.m.",
    "APPLE_EVENTS.BUTTON_PLAY": "Play",
    "APPLE_EVENTS.COUNTER": "Starts in",
    "APPLE_EVENTS.WWDC2014_DESC": "See Apple CEO Tim Cook unveil iOS 8 and OS X Yosemite at WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 Keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "September 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 a.m. (Pacific)",
    "APPLE_EVENTS.SEP2014_DATE": "September 9, 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Tune in at 10:00 a.m. (Pacific) on September 9 to watch this event live.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@m @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_TIME": "10:00 a.m. (Pacific)",
    "APPLE_EVENTS.OCT2014_DATE": "October 16, 2014",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, California",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "October 2014",
    "APPLE_EVENTS.AM": "AM",
    "APPLE_EVENTS.PM": "PM",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@MONTH@@ @@DATE@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@MONTH@@ @@DATE@@, @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR12@@:@@MINUTE@@ @@AMPM@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Sep",
    "APPLE_EVENTS.SEPTEMBER_LONG": "September",
    "APPLE_EVENTS.OCTOBER_SHORT": "Oct",
    "APPLE_EVENTS.OCTOBER_LONG": "October",
    "APPLE_EVENTS.JUNE_LONG": "June",
    "APPLE_EVENTS.SEP2014_DESC": "From the launch of Apple Watch to the arrival of iPhone 6 to a live performance from U2, this is an event not to be missed.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MARCH_LONG": "March",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "March 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple Special Event – LIVE",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.OCT2014_DESC": "Get a first look at iMac with Retina 5K display and iPad Air 2. Learn about the release of OS X Yosemite. And follow every moment of the special event at Town Hall on the Apple campus.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Get an in-depth look at Apple Watch, witness the unveiling of the new MacBook, and learn about the innovations in ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "June 8, 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Schedule",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Tracks",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favorites",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "About",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Live",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Mark as watched",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Mark as unwatched",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Mark all as watched",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Mark all as unwatched",
    "APPLE_EVENTS.BUTTON_LIVE": "Watch Live",
    "APPLE_EVENTS.BUTTON_ADD": "Add",
    "APPLE_EVENTS.BUTTON_REMOVE": "Remove",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 Keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "Other Sessions in @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Related Sessions",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Watch the special event held at the Moscone Center in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "This event has concluded and will be available for viewing shortly.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Tune in at @@HOUR12@@:@@MINUTE@@ @@AMPM@@ (local time) on @@MONTH@@ @@DATE@@ to watch this event live.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Track",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Date",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Time",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Location",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "No Favorites",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Please add sessions to your favorites.",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Next",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "This live stream has ended.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Keynote – LIVE",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "General Information",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "The Apple Worldwide Developers Conference (WWDC) gives developers an in-depth look at the latest in iOS and OS X. You can learn from and be inspired by more than 100 sessions led by Apple engineers, get help from Apple experts through an extensive set of hands-on labs, and connect with fellow developers from around the world, giving you the opportunity to create your best apps ever. WWDC takes place June 8 – 12, 2015 at Moscone West in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Viewing Sessions",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "We'll be live streaming select sessions daily and posting videos of all sessions throughout the week of the conference. For more information please visit developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Terms of Use",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. All Rights Reserved.\r\n\r\nYou are prohibited from copying, modifying, redistributing, rebroadcasting or re-encoding this content without prior written permission from Apple, except as may be permitted by law. The information and technologies described within are subject to change."
  },
  "es-MX": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 de junio de 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (horario del Pacífico)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "El video de este evento no está disponible en este momento.",
    "APPLE_EVENTS.SECTION_HEADER": "Otros eventos",
    "APPLE_EVENTS.OCT2013_TITLE": "Evento especial de Apple - Octubre de 2013",
    "APPLE_EVENTS.OCT2013_DESC": "El CEO de Apple Tim Cook presenta el nuevo iPad Air, el iPad mini con pantalla Retina, el Mac Pro, OS X Mavericks y la siguiente generación de apps de iWork y iLife.",
    "APPLE_EVENTS.OCT2013_DATE": "22 de octubre de 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Evento especial de Apple - Septiembre de 2013",
    "APPLE_EVENTS.SEP2013_DESC": "El CEO de Apple Tim Cook presenta el iPhone 5s, el iPhone 5c y más.",
    "APPLE_EVENTS.SEP2013_DATE": "10 de septiembre de 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "Presentación de la WWDC 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "El CEO de Apple Tim Cook presenta iOS 7, el nuevo Mac Pro, OS X Mavericks, el nuevo MacBook Air, iTunes Radio, la versión beta de iWork para iCloud, Airport Time Capsule y más.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 de junio de 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Evento especial de Apple - Octubre de 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Tim Cook, director ejecutivo de Apple, desvela los nuevos iPad mini, iPad con pantalla Retina, las nuevas iMac y MacBook Pro de 13\" con pantalla Retina y mucho más.",
    "APPLE_EVENTS.OCT2012_DATE": "23 de octubre de 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Evento especial de Apple - Septiembre de 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Tim Cook, director ejecutivo de Apple, desvela los nuevos iPhone 5, iPod touch, iPod nano y mucho más.",
    "APPLE_EVENTS.SEP2012_DATE": "12 de septiembre de 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "Presentación de la WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Video en streaming de la presentación de la WWDC 2012.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 de junio de 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Octubre 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Sept. 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Octubre 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Sept. 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Muy pronto",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Ver",
    "APPLE_EVENTS.COUNTER": "Empieza en",
    "APPLE_EVENTS.WWDC2014_DESC": "El CEO de Apple Tim Cook presenta iOS 8 y OS X Yosemite en el WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Presentación de la WWDC 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Sept. 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (horario del Pacífico)",
    "APPLE_EVENTS.SEP2014_DATE": "9 de septiembre de 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Puedes ver este evento en vivo el 9 de septiembre a las 10:00 (horario del Pacífico).",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@min @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, California",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Octubre 2014",
    "APPLE_EVENTS.AM": "a.m.",
    "APPLE_EVENTS.PM": "p.m.",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ de @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ de @@MONTH@@ de @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR12@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Sep",
    "APPLE_EVENTS.SEPTEMBER_LONG": "Septiembre",
    "APPLE_EVENTS.OCTOBER_SHORT": "oct",
    "APPLE_EVENTS.OCTOBER_LONG": "octubre",
    "APPLE_EVENTS.JUNE_LONG": "junio",
    "APPLE_EVENTS.SEP2014_DESC": "El lanzamiento del Apple Watch, la llegada del iPhone 6 o la presentación en vivo de U2. Un evento que no te puedes perder.",
    "APPLE_EVENTS.SEP2014_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.MARCH_LONG": "Marzo",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "Marzo 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Evento especial de Apple – EN VIVO",
    "APPLE_EVENTS.OCT2014_TITLE": "Evento especial de Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Echa un primer vistazo a la iMac con pantalla Retina 5K y el iPad Air 2. Descubre el nuevo OS X Yosemite. Y sigue al completo el evento especial en el Town Hall del campus de Apple.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Echa un vistazo en profundidad al Apple Watch, disfruta la presentación del nuevo MacBook y descubre las innovaciones de ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 de junio de 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Programa",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Temas",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoritos",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "Acerca de",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "En vivo",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Marcar como visto",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Marcar como no visto",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Marcar todos como vistos",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Marcar todos como no vistos",
    "APPLE_EVENTS.BUTTON_LIVE": "Ver en vivo",
    "APPLE_EVENTS.BUTTON_ADD": "Añadir",
    "APPLE_EVENTS.BUTTON_REMOVE": "Eliminar",
    "APPLE_EVENTS.WWDC2015_TITLE": "Keynote de la WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Otras sesiones en @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Sesiones relacionadas",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Disfruta del evento especial celebrado en el Moscone Center de San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "Este evento ya terminó. El video estará disponible muy pronto.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Puedes ver este evento en vivo a las @@HOUR24@@:@@MINUTE@@ (horario local) del @@DATE@@ de @@MONTH@@.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Tema",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Fecha",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Hora",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Lugar",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "No hay favoritos",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Añade sesiones a tus favoritos",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Foco",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Siguiente",
    "APPLE_EVENTS.WWDC2015_LIVE": "En vivo",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Esta emisión en vivo ya terminó.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Keynote de la WWDC 2015: en vivo",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Información general",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "La Conferencia Mundial de Desarrolladores de Apple (WWDC) permite a los desarrolladores conocer a fondo las últimas novedades de iOS y OS X. Puedes aprender e inspirarte en más de 100 sesiones dirigidas por ingenieros de Apple, obtener ayuda de nuestros expertos a través de una serie de sesiones prácticas y conectar con desarrolladores de todo el mundo. La WWDC te da la oportunidad de crear las mejores apps de tu vida. La conferencia se celebrará del 8 al 12 de junio en el Moscone West de San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Cómo ver las sesiones",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Emitiremos las sesiones en vivo a diario y también podrás ver videos de todas ellas durante la semana de la conferencia. Consulta los detalles en developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Términos de uso",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Todas las sesiones de la WWDC están bajo el copyright © 2015 Apple Inc. Todos los derechos quedan reservados y son únicamente para uso personal y no comercial de nuestros desarrolladores. Cualquier otro uso de estas emisiones está prohibido sin permiso previo y por escrito de Apple. La información y las tecnologías aquí descritas están sujetas a cambios."
  },
  "en-AU": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 June, 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (Pacific)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple Special Event",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "This event is currently not available for viewing.",
    "APPLE_EVENTS.SECTION_HEADER": "Other Events",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple Special Event - October 2013",
    "APPLE_EVENTS.OCT2013_DESC": "See Apple CEO Tim Cook introduce the new iPad Air, iPad mini with Retina display, Mac Pro, OS X Mavericks and next-generation iWork and iLife apps.",
    "APPLE_EVENTS.OCT2013_DATE": "22 October, 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple Special Event - September 2013",
    "APPLE_EVENTS.SEP2013_DESC": "See Apple CEO Tim Cook unveil the iPhone 5s, iPhone 5c and more.",
    "APPLE_EVENTS.SEP2013_DATE": "10 September, 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 Keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "See Apple CEO Tim Cook unveil iOS 7, the new Mac Pro, OS X Mavericks, the new MacBook Air, iTunes Radio, iWork for iCloud beta, AirPort Time Capsule and more.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 June, 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple Special Event - October 2012",
    "APPLE_EVENTS.OCT2012_DESC": "See Apple CEO Tim Cook unveil the new iPad mini, the new iPad with Retina display, the new iMac, the new 13\" MacBook Pro with Retina display and more.",
    "APPLE_EVENTS.OCT2012_DATE": "23 October, 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple Special Event - September 2012",
    "APPLE_EVENTS.SEP2012_DESC": "See Apple CEO Tim Cook unveil the new iPhone 5, the new iPod touch, the new iPod nano and more.",
    "APPLE_EVENTS.SEP2012_DATE": "12 September, 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 Keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "See the streaming video from the WWDC 2012 keynote.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 June, 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "October 2012",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "October 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Coming Soon",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Play",
    "APPLE_EVENTS.COUNTER": "Starts in",
    "APPLE_EVENTS.WWDC2014_DESC": "See Apple CEO Tim Cook unveil iOS 8 and OS X Yosemite at WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 Keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "September 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (Pacific)",
    "APPLE_EVENTS.SEP2014_DATE": "9 September, 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Tune in at 10:00 (Pacific) on 9 September to watch this event live.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@m @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, California",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "October 2014",
    "APPLE_EVENTS.AM": "am",
    "APPLE_EVENTS.PM": "pm",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@, @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR12@@:@@MINUTE@@ @@AMPM@@",
    "APPLE_EVENTS.OCTOBER_SHORT": "Oct",
    "APPLE_EVENTS.OCTOBER_LONG": "October",
    "APPLE_EVENTS.JUNE_LONG": "June",
    "APPLE_EVENTS.SEP2014_DESC": "From the launch of Apple Watch to the arrival of iPhone 6 to a live performance from U2, this is an event not to be missed.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MARCH_LONG": "March",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "March 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple Special Event – LIVE",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.OCT2014_DESC": "Get a first look at iMac with Retina 5K display and iPad Air 2. Learn about the release of OS X Yosemite. And follow every moment of the special event at Town Hall on the Apple campus.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Get an in-depth look at Apple Watch, witness the unveiling of the new MacBook and learn about the innovations in ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 June, 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Schedule",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Tracks",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favourites",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "About",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Live",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Mark as watched",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Mark as unwatched",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Mark all as watched",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Mark all as unwatched",
    "APPLE_EVENTS.BUTTON_LIVE": "Watch Live",
    "APPLE_EVENTS.BUTTON_ADD": "Add",
    "APPLE_EVENTS.BUTTON_REMOVE": "Remove",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 Keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "Other Sessions in @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Related Sessions",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Watch the special event held at the Moscone Center in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "This event has concluded and will be available for viewing shortly.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Tune in at @@HOUR12@@:@@MINUTE@@ @@AMPM@@ (local time) on @@DATE@@ @@MONTH@@ to watch this event live.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Track",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Date",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Time",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Location",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "No Favourites",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Please add sessions to your favourites.",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Next",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "This live stream has ended.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Keynote – LIVE",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "General Information",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "The Apple Worldwide Developers Conference (WWDC) gives developers an in-depth look at the latest in iOS and OS X. You can learn from and be inspired by more than 100 sessions led by Apple engineers, get help from Apple experts through an extensive set of hands-on labs and connect with fellow developers from around the world, giving you the opportunity to create your best apps ever. WWDC takes place June 8 – 12, 2015 at Moscone West in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Viewing Sessions",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "We’ll be live streaming select sessions daily and posting videos of all sessions throughout the week of the conference. For more information please visit developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Terms of Use",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. All Rights Reserved.\r\n\r\nYou are prohibited from copying, modifying, redistributing, rebroadcasting or re-encoding this content without prior written permission from Apple, except as may be permitted by law. The information and technologies described within are subject to change."
  },
  "en-CA": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 June, 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10:00 (Pacific)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Apple Special Event",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "This event is currently not available for viewing.",
    "APPLE_EVENTS.SECTION_HEADER": "Other Events",
    "APPLE_EVENTS.OCT2013_TITLE": "Apple Special Event - October 2013",
    "APPLE_EVENTS.OCT2013_DESC": "See Apple CEO Tim Cook introduce the new iPad Air, iPad mini with Retina display, Mac Pro, OS X Mavericks, and next-generation iWork and iLife apps.",
    "APPLE_EVENTS.OCT2013_DATE": "22 October, 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Apple Special Event - September 2013",
    "APPLE_EVENTS.SEP2013_DESC": "See Apple CEO Tim Cook unveil the iPhone 5s, iPhone 5c, and more.",
    "APPLE_EVENTS.SEP2013_DATE": "10 September, 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "WWDC 2013 Keynote",
    "APPLE_EVENTS.WWDC2013_DESC": "See Apple CEO Tim Cook unveil iOS 7, the new Mac Pro, OS X Mavericks, the new MacBook Air, iTunes Radio, iWork for iCloud beta, AirPort Time Capsule, and more.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 June, 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Apple Special Event - October 2012",
    "APPLE_EVENTS.OCT2012_DESC": "See Apple CEO Tim Cook unveil the new iPad mini, the new iPad with Retina display, the new iMac, the new 13\" MacBook Pro with Retina display and more.",
    "APPLE_EVENTS.OCT2012_DATE": "23 October, 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Apple Special Event - September 2012",
    "APPLE_EVENTS.SEP2012_DESC": "See Apple CEO Tim Cook unveil the new iPhone 5, the new iPod touch, the new iPod nano and more.",
    "APPLE_EVENTS.SEP2012_DATE": "12 September, 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "WWDC 2012 Keynote",
    "APPLE_EVENTS.WWDC2012_DESC": "See the streaming video from the WWDC 2012 keynote.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 June, 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "October 2012",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "September 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "October 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "September 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Coming Soon",
    "APPLE_EVENTS.BUTTON_TIME": "10:00",
    "APPLE_EVENTS.BUTTON_PLAY": "Play",
    "APPLE_EVENTS.COUNTER": "Starts in",
    "APPLE_EVENTS.WWDC2014_DESC": "See Apple CEO Tim Cook unveil iOS 8 and OS X Yosemite at WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "WWDC 2014 Keynote",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "September 2014",
    "APPLE_EVENTS.SEP2014_TIME": "10:00 (Pacific)",
    "APPLE_EVENTS.SEP2014_DATE": "9 September, 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts, Cupertino",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Tune in at 10:00 (Pacific) on 9 September to watch this event live.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@d @@HOURS@@h @@MINUTES@@m @@SECONDS@@s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino, California",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "October 2014",
    "APPLE_EVENTS.AM": "AM",
    "APPLE_EVENTS.PM": "PM",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@MONTH@@ @@DATE@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@MONTH@@ @@DATE@@, @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR12@@:@@MINUTE@@ @@AMPM@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "Sep",
    "APPLE_EVENTS.SEPTEMBER_LONG": "September",
    "APPLE_EVENTS.OCTOBER_SHORT": "Oct",
    "APPLE_EVENTS.OCTOBER_LONG": "October",
    "APPLE_EVENTS.JUNE_LONG": "June",
    "APPLE_EVENTS.SEP2014_DESC": "From the launch of Apple Watch to the arrival of iPhone 6 to a live performance from U2, this is an event not to be missed.",
    "APPLE_EVENTS.SEP2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MARCH_LONG": "March",
    "APPLE_EVENTS.MARCH_SHORT": "Mar",
    "APPLE_EVENTS.MAR2015_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "March 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Apple Special Event",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Apple Special Event – LIVE",
    "APPLE_EVENTS.OCT2014_TITLE": "Apple Special Event",
    "APPLE_EVENTS.OCT2014_DESC": "Get a first look at iMac with Retina 5K display and iPad Air 2. Learn about the release of OS X Yosemite. And follow every moment of the special event at Town Hall on the Apple campus.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Get an in-depth look at Apple Watch, witness the unveiling of the new MacBook, and learn about the innovations in ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "June 8, 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Schedule",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Tracks",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favourites",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "About",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "Live",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Mark as watched",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Mark as unwatched",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Mark as watched",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Mark as unwatched",
    "APPLE_EVENTS.BUTTON_LIVE": "Watch Live",
    "APPLE_EVENTS.BUTTON_ADD": "Add",
    "APPLE_EVENTS.BUTTON_REMOVE": "Remove",
    "APPLE_EVENTS.WWDC2015_TITLE": "WWDC 2015 Keynote",
    "APPLE_EVENTS.OTHER_SESSIONS": "Other Sessions in @@TRACK@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Related Sessions",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Watch the special event held at the Moscone Center in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "This event has concluded and will be available for viewing shortly.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Tune in at @@HOUR12@@:@@MINUTE@@ @@AMPM@@ (local time) on @@MONTH@@ @@DATE@@ to watch this event live.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Track",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Date",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Time",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Location",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "No Favourites",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Please add sessions to your favourites.",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Focus",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Next",
    "APPLE_EVENTS.WWDC2015_LIVE": "Live",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "This live stream has ended.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "WWDC 2015 Keynote – LIVE",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "General Information",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "The Apple Worldwide Developers Conference (WWDC) gives developers an in-depth look at the latest in iOS and OS X. You can learn from and be inspired by more than 100 sessions led by Apple engineers, get help from Apple experts through an extensive set of hands-on labs, and connect with fellow developers from around the world, giving you the opportunity to create your best apps ever. WWDC takes place June 8 – 12, 2015 at Moscone West in San Francisco, California.",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Viewing Sessions",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "We’ll be live streaming select sessions daily and posting videos of all sessions throughout the week of the conference. For more information please visit developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Terms of Use",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "© 2015 Apple Inc. All Rights Reserved.\r\n\r\nYou are prohibited from copying, modifying, redistributing, rebroadcasting or re-encoding this content without prior written permission from Apple, except as may be permitted by law. The information and technologies described within are subject to change."
  },
  "fr-CA": {
    "APPLE_EVENTS.WWDC2014_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2014_DATE": "2 juin 2014",
    "APPLE_EVENTS.WWDC2014_TIME": "10 h (PST)",
    "APPLE_EVENTS.WWDC2014_SECTION_TITLE": "WWDC 2014",
    "APPLE_EVENTS.DIALOG_ERROR_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.DIALOG_ERROR_EXPLANATION": "Cet événement n’est actuellement pas disponible en vidéo.",
    "APPLE_EVENTS.SECTION_HEADER": "Autres événements",
    "APPLE_EVENTS.OCT2013_TITLE": "Événement spécial d’Apple - Octobre 2013",
    "APPLE_EVENTS.OCT2013_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler le nouvel iPad Air, l’iPad mini avec écran Retina, le Mac Pro, OS X Mavericks et les apps iWork et iLife de nouvelle génération.",
    "APPLE_EVENTS.OCT2013_DATE": "22 octobre 2013",
    "APPLE_EVENTS.SEP2013_TITLE": "Événement spécial d’Apple - Septembre 2013",
    "APPLE_EVENTS.SEP2013_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler l’iPhone 5s, l’iPhone 5c et plus.",
    "APPLE_EVENTS.SEP2013_DATE": "10 septembre 2013",
    "APPLE_EVENTS.WWDC2013_TITLE": "Keynote de la WWDC 2013",
    "APPLE_EVENTS.WWDC2013_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler iOS 7, le nouveau Mac Pro, OS X Mavericks, le nouveau MacBook Air, iTunes Radio, iWork pour iCloud beta, AirPort Time Capsule et plus.",
    "APPLE_EVENTS.WWDC2013_DATE": "10 juin 2013",
    "APPLE_EVENTS.OCT2012_TITLE": "Événement spécial d’Apple - Octobre 2012",
    "APPLE_EVENTS.OCT2012_DESC": "Regardez Tim Cook, le directeur général d’Apple, dévoiler le nouvel iPad mini, le nouvel iPad avec écran Retina, le nouvel iMac, le nouveau MacBook Pro avec écran Retina de 13 pouces, et plus.",
    "APPLE_EVENTS.OCT2012_DATE": "23 octobre 2012",
    "APPLE_EVENTS.SEP2012_TITLE": "Événement spécial d’Apple - Septembre 2012",
    "APPLE_EVENTS.SEP2012_DESC": "Regardez Tim Cook, le directeur général d’Apple, dévoiler le nouvel iPhone 5, le nouvel iPod touch, le nouvel iPod nano et plus.",
    "APPLE_EVENTS.SEP2012_DATE": "12 septembre 2012",
    "APPLE_EVENTS.WWDC2012_TITLE": "Keynote de la WWDC 2012",
    "APPLE_EVENTS.WWDC2012_DESC": "Regardez la vidéo de la keynote de la WWDC 2012.",
    "APPLE_EVENTS.WWDC2012_DATE": "11 juin 2012",
    "APPLE_EVENTS.WWDC2014_TITLE_SHORT": "WWDC 2014",
    "APPLE_EVENTS.OCT2013_TITLE_SHORT": "Octobre 2013",
    "APPLE_EVENTS.SEP2013_TITLE_SHORT": "Septembre 2013",
    "APPLE_EVENTS.WWDC2013_TITLE_SHORT": "WWDC 2013",
    "APPLE_EVENTS.OCT2012_TITLE_SHORT": "Octobre 2012",
    "APPLE_EVENTS.SEP2012_TITLE_SHORT": "Septembre 2012",
    "APPLE_EVENTS.WWDC2012_TITLE_SHORT": "WWDC 2012",
    "APPLE_EVENTS.BUTTON_COMING_SOON": "Bientôt",
    "APPLE_EVENTS.BUTTON_TIME": "10 h",
    "APPLE_EVENTS.BUTTON_PLAY": "Lire",
    "APPLE_EVENTS.COUNTER": "Débute dans",
    "APPLE_EVENTS.WWDC2014_DESC": "Regardez Tim Cook, le PDG d’Apple, dévoiler iOS 8 et OS X Yosemite lors de la WWDC 2014.",
    "APPLE_EVENTS.WWDC2014_TITLE": "Keynote de la WWDC 2014",
    "APPLE_EVENTS.SEP2014_TITLE_SHORT": "Septembre 2014",
    "APPLE_EVENTS.SEP2014_TIME": "13 h",
    "APPLE_EVENTS.SEP2014_DATE": "9 septembre 2014",
    "APPLE_EVENTS.SEP2014_LOCATION": "Flint Center for the Performing Arts (Cupertino)",
    "APPLE_EVENTS.SEP2014_DIALOG_PRE_EXPLANATION": "Revenez le 9 septembre à 13 h pour regarder l’événement en direct.",
    "APPLE_EVENTS.COUNTDOWN_TIMER": "@@DAYS@@ j @@HOURS@@ h @@MINUTES@@ min @@SECONDS@@ s",
    "APPLE_EVENTS.OCT2014_LOCATION": "Cupertino (Californie)",
    "APPLE_EVENTS.OCT2014_TITLE_SHORT": "Octobre 2014",
    "APPLE_EVENTS.DATE_WITHOUT_YEAR_FORMAT": "@@DATE@@ @@MONTH@@",
    "APPLE_EVENTS.DATE_FORMAT": "@@DATE@@ @@MONTH@@ @@YEAR@@",
    "APPLE_EVENTS.TIME_FORMAT": "@@HOUR24@@:@@MINUTE@@",
    "APPLE_EVENTS.SEPTEMBER_SHORT": "sept.",
    "APPLE_EVENTS.SEPTEMBER_LONG": "septembre",
    "APPLE_EVENTS.OCTOBER_SHORT": "oct.",
    "APPLE_EVENTS.OCTOBER_LONG": "octobre",
    "APPLE_EVENTS.JUNE_LONG": "juin",
    "APPLE_EVENTS.SEP2014_DESC": "Du lancement de l’Apple Watch à celui de l’iPhone 6 en passant par une prestation live de U2, ne manquez rien de l’événement.",
    "APPLE_EVENTS.SEP2014_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.MARCH_LONG": "mars",
    "APPLE_EVENTS.MARCH_SHORT": "mars",
    "APPLE_EVENTS.MAR2015_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.MAR2015_LOCATION": "Yerba Buena Center for the Arts, San Francisco",
    "APPLE_EVENTS.MAR2015_TITLE_SHORT": "mars 2015",
    "APPLE_EVENTS.MAR2015_DIALOG_PRE_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.MAR2015_TITLE_LIVE": "Événement spécial d’Apple en direct",
    "APPLE_EVENTS.OCT2014_TITLE": "Événement spécial d’Apple",
    "APPLE_EVENTS.OCT2014_DESC": "Découvrez l’iMac avec écran Retina 5K, l’iPad Air 2, ainsi que tous les détails sur la sortie d’OS X Yosemite révélés lors de l’événement spécial qui s’est tenu au Town Hall d’Apple.",
    "APPLE_EVENTS.MAR2015_DESC_POST": "Assistez au dévoilement du nouveau MacBook, et découvrez de près l’Apple Watch ainsi que les vastes possibilités qu’offre ResearchKit.",
    "APPLE_EVENTS.WWDC2015_DATE": "8 juin 2015",
    "APPLE_EVENTS.WWDC2015_NAV_KEYNOTE": "Keynote",
    "APPLE_EVENTS.WWDC2015_NAV_SCHEDULE": "Programme",
    "APPLE_EVENTS.WWDC2015_NAV_TRACKS": "Domaines",
    "APPLE_EVENTS.WWDC2015_NAV_FAVS": "Favoris",
    "APPLE_EVENTS.WWDC2015_NAV_ABOUT": "À propos",
    "APPLE_EVENTS.WWDC2015_NAV_LIVE": "En direct",
    "APPLE_EVENTS.MARK_AS_WATCHED": "Marquer comme visionné",
    "APPLE_EVENTS.MARK_AS_UNWATCHED": "Marquer comme non visionné",
    "APPLE_EVENTS.MARK_ALL_AS_WATCHED": "Marquer tout comme visionné",
    "APPLE_EVENTS.MARK_ALL_AS_UNWATCHED": "Marquer tout comme non visionné",
    "APPLE_EVENTS.BUTTON_LIVE": "Regarder en direct",
    "APPLE_EVENTS.BUTTON_ADD": "Ajouter",
    "APPLE_EVENTS.BUTTON_REMOVE": "Supprimer",
    "APPLE_EVENTS.WWDC2015_TITLE": "Keynote de la WWDC 2015",
    "APPLE_EVENTS.OTHER_SESSIONS": "Autres sessions dans @@Track@@",
    "APPLE_EVENTS.RELATED_SESSIONS": "Sessions reliées",
    "APPLE_EVENTS.WWDC2015_DESC_POST": "Regardez l’événement spécial au Moscone Center à San Francisco (Californie).",
    "APPLE_EVENTS.WWDC2015_TITLE_SHORT": "WWDC 2015",
    "APPLE_EVENTS.WWDC2015_DESC_INTERIM": "L’événement est terminé et sera disponible en vidéo prochainement.",
    "APPLE_EVENTS.WWDC2015_DESC_LIVE": "Revenez le @@DATE@@ @@MONTH@@ à @@HOUR24@@:@@MINUTE@@ (heure locale) pour regarder l’événement en direct.",
    "APPLE_EVENTS.WWDC2015_SESSION_TRACK": "Ateliers",
    "APPLE_EVENTS.WWDC2015_SESSION_DATE": "Date",
    "APPLE_EVENTS.WWDC2015_SESSION_TIME": "Heure",
    "APPLE_EVENTS.WWDC2015_SESSION_LOCATION": "Emplacement",
    "APPLE_EVENTS.WWDC2015_NO_FAV_TITLE": "Aucun favori",
    "APPLE_EVENTS.WWDC2015_NO_FAV_DESC": "Ajoutez des sessions à vos favoris",
    "APPLE_EVENTS.WWDC2015_SESSION_FOCUS": "Accent",
    "APPLE_EVENTS.WWDC2015_LIVE_NEXT": "Suivant",
    "APPLE_EVENTS.WWDC2015_LIVE": "En direct",
    "APPLE_EVENTS.WWDC2015_LIVE_END_TITLE": "Cette diffusion est terminée.",
    "APPLE_EVENTS.WWDC2015_TITLE_LIVE": "Keynote de la WWDC 2015 en direct",
    "APPLE_EVENTS.WWDC2015_LOCATION": "Moscone Center, San Francisco",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_TITLE": "Informations générales",
    "APPLE_EVENTS.WWDC2015_ABOUT_GENERAL_DESC": "La WWDC (Apple Worldwide Developers Conference) présente aux développeurs les plus récentes innovations en matière d’iOS et d’OS X. Participez à plus de 100 sessions menées par des ingénieurs d’Apple, obtenez l’aide de nos experts grâce à de nombreux ateliers pratiques, rencontrez des développeurs du monde entier et trouvez l’inspiration pour créer des apps exceptionnelles. La WWDC a lieu du 8 au 12 juin 2015, au Moscone West à San Francisco (Californie).",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_TITLE": "Regarder les sessions",
    "APPLE_EVENTS.WWDC2015_ABOUT_VIEWING_DESC": "Certaines sessions seront disponibles en diffusion continue en direct chaque jour de la conférence, et des vidéos de toutes les sessions seront affichées au cours de la semaine. Pour plus d’information, veuillez consulter developer.apple.com/wwdc.",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_TITLE": "Conditions d’utilisation",
    "APPLE_EVENTS.WWDC2015_ABOUT_TERMS_DESC": "Toutes les sessions WWDC sont protégées par le droit d’auteur, Copyright © 2015 Apple Inc. Tous droits réservés, à l’usage personnel et non commercial des développeurs. Toute autre utilisation de ces diffusions est interdite sans le consentement écrit préalable d’Apple. Les informations et les technologies présentées sont sujettes à changement."
  }
}

var eventController = ( function() {
	var pollingTimer = null;
	var countdownTimer = null;

	var feedData = null;

	function formatTime(time, format){
        format = "APPLE_EVENTS." + format.toUpperCase() + "_FORMAT";

		var language = atvutils.data("language");
        var date = new Date(time);
        if (date.getMonth() == 2){
        	var month = LOCALIZATION[language]["APPLE_EVENTS.MARCH_LONG"];
        } else if (date.getMonth() == 5){
        	var month = LOCALIZATION[language]["APPLE_EVENTS.JUNE_LONG"];
        } else if (date.getMonth() == 8){
        	var month = LOCALIZATION[language]["APPLE_EVENTS.SEPTEMBER_LONG"]
        } else if (date.getMonth() == 9){
        	var month = LOCALIZATION[language]["APPLE_EVENTS.OCTOBER_LONG"];
        }

        if (format == "APPLE_EVENTS.DATE_FORMAT"){
            return LOCALIZATION[language][format].replace("@@MONTH@@", month).replace("@@DATE@@", date.getDate()).replace("@@YEAR@@", date.getFullYear());
        } else if (format == "date"){
            return LOCALIZATION[language][format].replace("@@MONTH@@", month).replace("@@DATE@@", date.getDate());
        } else if (format == "APPLE_EVENTS.TIME_FORMAT"){
            if (LOCALIZATION[language][format].indexOf("@@HOUR12@@") == -1){
                return LOCALIZATION[language][format].replace("@@HOUR24@@", date.getHours()).replace("@@MINUTE@@", zeroPad(date.getMinutes()));
            } else {
                var hours = date.getHours();
                if (hours >= 12){
                    hours -= 12;
                    var meridian = LOCALIZATION[language]["APPLE_EVENTS.PM"]
                } else {
                    var meridian = LOCALIZATION[language]["APPLE_EVENTS.AM"]
                }
                if (hours == 0){
                    hours = 12;
                }

                return LOCALIZATION[language][format].replace("@@HOUR12@@", hours).replace("@@MINUTE@@", zeroPad(date.getMinutes())).replace("@@AMPM@@", meridian);
            }
        } else {
            return "FORMATTEDDATETIME";
        }
    }

    function localizeTimeInString(time, string){
    	// work around for missing loc keys
    	if (string == undefined){
    		return string;
    	}

    	var language = atvutils.data("language");
        var date = new Date(time);
        if (date.getMonth() == 2){
        	var month = LOCALIZATION[language]["APPLE_EVENTS.MARCH_LONG"];
        } else if (date.getMonth() == 5){
            var month = LOCALIZATION[language]["APPLE_EVENTS.JUNE_LONG"];
        } else if (date.getMonth() == 8){
            var month = LOCALIZATION[language]["APPLE_EVENTS.SEPTEMBER_LONG"]
        } else if (date.getMonth() == 9){
            var month = LOCALIZATION[language]["APPLE_EVENTS.OCTOBER_LONG"];
        }

        if (string.indexOf("@@HOUR24@@") != -1){
            return string.replace("@@MONTH@@", month).replace("@@DATE@@", date.getDate()).replace("@@HOUR24@@", date.getHours()).replace("@@MINUTE@@", zeroPad(date.getMinutes()));
        } else {
            var hours = date.getHours();
            if (hours >= 12){
                hours -= 12;
                var meridian = LOCALIZATION[language]["APPLE_EVENTS.PM"]
            } else {
                var meridian = LOCALIZATION[language]["APPLE_EVENTS.AM"]
            }
            if (hours == 0){
                hours = 12;
            }
            return string.replace("@@MONTH@@", month).replace("@@DATE@@", date.getDate()).replace("@@HOUR12@@", hours).replace("@@MINUTE@@", zeroPad(date.getMinutes())).replace("@@AMPM@@", meridian);
        }
    }

	function fingerprint(string){
		var hash = atv.crypto.SHA1(string);
		console.log(hash);
	    return hash;
	}

	function showNav(){
		console.log("Showing nav...");

		var sessions_data = loadFeedData();

		var proxy = new atv.ProxyDocument();
		proxy.show();

		var xml = new EJS({ text : TEMPLATES["NAVBAR"]}).render(sessions_data);

		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1)
	}

	function onNavigate(event){
		var nav_id = event.navigationItemId,
			nav_item = document.getElementById(nav_id),
			template = nav_item.getElementByTagName("template").textContent;


		var sessions_data = loadFeedData();

		if (template == "keynote"){
			var xml = loadEvent(INITIAL_EVENT);
		} else if (template == "live"){
			console.log(template);
			var xml = loadLive();
			atvutils.data("live-hash", fingerprint(xml));
		} else if (template == "schedule"){
			var xml = loadSchedule();
			atvutils.data("schedule-hash", fingerprint(xml));
		} else if (template == "tracks"){
			var xml = loadTracklist();
			atvutils.data("tracklist-hash", fingerprint(xml));
		} else if (template == "favorites"){
			var xml = loadFavorites();
			atvutils.data("favorites-hash", fingerprint(xml));
		} else if (template == "about") {
			var xml = new EJS({ text : TEMPLATES["ABOUT"]}).render(sessions_data);
		} else {
			var xml = loadEvent(INITIAL_EVENT);
		}

	    event.success(atv.parseXML( xml ));
	}

	function isThereAtleastOneRemainingLiveSession(){
		var sessions_data = loadFeedData();

		var last_session = sessions_data.live_schedule[sessions_data.live_schedule.length - 1].live;

		var last_session_end_time = new Date(sessions_data.sessions[last_session].end_date);

		return (atvutils.data("now") < last_session_end_time);
	}

	function loadLive(){
		var sessions_data = loadFeedData();
		if (isThereAtleastOneRemainingLiveSession() == true){
			return new EJS({ text : TEMPLATES["LIVE"]}).render(sessions_data);
		} else {
			return new EJS({ text : TEMPLATES["ERROR"]}).render({ "id" : "favorites", "title" : sessions_data.loc["APPLE_EVENTS.WWDC2015_LIVE_END_TITLE"], "description" : ""});
		}
	}

	function refreshLive(){
		console.log("Refresh Live page triggered...")
		var xml = loadLive();
		var new_fingerprint = fingerprint(xml);
		var new_xml = atv.parseXML(xml);

		var current_fingerprint = atvutils.data("live-hash");
		if (current_fingerprint && current_fingerprint != new_fingerprint){
			console.log("Refreshing live page...");
			atv.loadAndSwapXML(new_xml);
			atvutils.data("live-hash", new_fingerprint);
		}
	}

	function volatileLiveReload(old_document){
		var xml = loadLive();
		var new_fingerprint = fingerprint(xml);
		var new_xml = atv.parseXML(xml);

		console.log("checking live page for volatile reload");
		if (new_fingerprint != atvutils.data("live-hash")){
			console.log("refreshing favorites page");
			atv.loadAndSwapXML(new_xml);
			atvutils.data("live-hash", new_fingerprint)
		} else {
			atv.loadAndSwapXML(old_document);
		}
	}

	function loadSchedule(day){
		var sessions_data = loadFeedData();

		if (day == null){
			var now = atvutils.data("now");
			var days = sessions_data.days;

			if (now < new Date(days[0])){
				day = 0;
			} else if (now < new Date(days[days.length - 1])) {
				for (var d = 0; d < days.length - 1; d++){
					if (new Date(days[d]) <= now && now < new Date(days[d + 1])){
						day = d;
						break;
					}
				}
			} else {
				day = days.length - 1
			}
		}

		sessions_data["current_day"] = day;
		sessions_data["current_day_key"] = sessions_data["days"][day];

		return new EJS({ text : TEMPLATES["SCHEDULE"]}).render(sessions_data);
	}

	function refreshSchedule(){
		console.log("checking schedule for refresh...");

		var navigation = document.getElementById("navigation");
		var currentIndex = navigation.getAttribute("currentIndex");
		var id = navigation.childElements[currentIndex].getAttribute("id");

		var xml = loadSchedule(id);
		var new_fingerprint = fingerprint(xml);

		var current_fingerprint = atvutils.data("schedule-hash");
		if (current_fingerprint && current_fingerprint != new_fingerprint){
			console.log("Refreshing schedule...");
			var new_menu_xml = atv.parseXML(xml).getElementById("menu-payload");
			new_menu_xml.removeFromParent();
			old_menu_xml = document.getElementById("menu-payload");
			old_menu_xml.parent.replaceChild(old_menu_xml, new_menu_xml);
			console.log("Schedule refreshed.");
			atvutils.data("schedule-hash", new_fingerprint)
		}
	}

	function volatileScheduleReload(old_document){
		console.log("volatile reload for schedule...");

		var navigation = old_document.getElementById("navigation");
		var currentIndex = navigation.getAttribute("currentIndex");
		var id = navigation.childElements[currentIndex].getAttribute("id");

		var xml = loadSchedule(id);
		var new_fingerprint = fingerprint(xml);

		var current_fingerprint = atvutils.data("schedule-hash");

		if (current_fingerprint && current_fingerprint != new_fingerprint){
			console.log("Refreshing schedule...");
			var new_menu_xml = atv.parseXML(xml).getElementById("menu-payload");
			new_menu_xml.removeFromParent();
			old_menu_xml = old_document.getElementById("menu-payload");
			old_menu_xml.parent.replaceChild(old_menu_xml, new_menu_xml);
			console.log("Schedule refreshed.");
			atvutils.data("schedule-hash", new_fingerprint)
		}

		atv.loadAndSwapXML(old_document);
	}

	function scheduleDidNavigate(event){
		var id = event.navigationItemId
		var xml = loadSchedule(id);

		var new_page_xml = atv.parseXML(xml);
		var new_menu_xml = new_page_xml.getElementById("menu-payload");
		new_menu_xml.removeFromParent();
		document.getElementById("navigation").setAttribute("currentIndex", new_page_xml.getElementById("navigation").getAttribute("currentIndex"));
		old_menu_xml = document.getElementById("menu-payload");
		old_menu_xml.parent.replaceChild(old_menu_xml, new_menu_xml);
	}

	function loadTracklist(){
		var sessions_data = loadFeedData();
		sessions_data.wwdc_poster_url = atvutils.data("base-url") + "images/" + INITIAL_EVENT + ".jpg"
		return new EJS({ text : TEMPLATES["TRACKLIST"]}).render(sessions_data);
	}


	function showTrack(id){
		console.log("attempting to show ", id);

		var proxy = new atv.ProxyDocument();
		proxy.show();

		var xml = loadTrack(id);

		atvutils.data("tracks-hash", fingerprint(xml));

		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1)
	}

	function loadTrack(track){
		var sessions_data = loadFeedData();

		if (track == null){
			track = 0;
		}

		sessions_data["current_track"] = track;

		sessions_data["current_track_key"] = sessions_data["tracks_dict"][track];

		return new EJS({ text : TEMPLATES["TRACK"]}).render(sessions_data);
	}

	function refreshTrack(){
		console.log("checking track for refresh...");

		var navigation = document.getElementById("navigation");
		var currentIndex = navigation.getAttribute("currentIndex");
		var id = navigation.childElements[currentIndex].getAttribute("id");

		var xml = loadTrack(id);
		var new_fingerprint = fingerprint(xml);

		var current_fingerprint = atvutils.data("tracks-hash");

		if (current_fingerprint && current_fingerprint != new_fingerprint){
			console.log("Refreshing track...");
			var new_menu_xml = atv.parseXML(xml).getElementById("menu-payload");
			new_menu_xml.removeFromParent();
			old_menu_xml = document.getElementById("menu-payload");
			old_menu_xml.parent.replaceChild(old_menu_xml, new_menu_xml);
			console.log("Track refreshed.");
			atvutils.data("tracks-hash", new_fingerprint)
		}
	}

	function volatileTrackReload(old_document){
		console.log("volatile reload for track...");

		var navigation = old_document.getElementById("navigation");
		var currentIndex = navigation.getAttribute("currentIndex");
		var id = navigation.childElements[currentIndex].getAttribute("id");

		var xml = loadTrack(id);
		var new_fingerprint = fingerprint(xml);

		var current_fingerprint = atvutils.data("tracks-hash");

		if (current_fingerprint && current_fingerprint != new_fingerprint){
			console.log("Refreshing track...");
			var new_menu_xml = atv.parseXML(xml).getElementById("menu-payload");
			new_menu_xml.removeFromParent();
			old_menu_xml = old_document.getElementById("menu-payload");
			old_menu_xml.parent.replaceChild(old_menu_xml, new_menu_xml);
			console.log("Track refreshed.");
			atvutils.data("tracks-hash", new_fingerprint)
		}

		atv.loadAndSwapXML(old_document);
	}

	function trackDidNavigate(event){
		var id = event.navigationItemId;
		var xml = loadTrack(id);

		var new_page_xml = atv.parseXML(xml);
		var new_menu_xml = new_page_xml.getElementById("menu-payload");
		new_menu_xml.removeFromParent();
		document.getElementById("navigation").setAttribute("currentIndex", new_page_xml.getElementById("navigation").getAttribute("currentIndex"));
		old_menu_xml = document.getElementById("menu-payload");
		old_menu_xml.parent.replaceChild(old_menu_xml, new_menu_xml);
	}

	function loadFavorites(){
		var favorites = atvutils.data("favorites");

		var sessions_data = loadFeedData();

		if (favorites && favorites.length > 0){
			var structured_favorites = {}
			for (var i = 0; i < sessions_data.days.length; i++){
				var day = sessions_data.days[i];
				var day_favorites = []
				for (var f = 0; f < favorites.length; f++){
					var favorite = sessions_data.sessions[favorites[f]];
					var favorite_timing = new Date(favorite.start_date) - new Date(day);
					if (favorite_timing >= 0 && favorite_timing < 86400000){
						day_favorites.push(favorites[f]);
					}
				}

				if (day_favorites.length > 0){
					day_favorites = day_favorites.sort(function(a, b){return new Date(sessions_data.sessions[a].start_date) - new Date(sessions_data.sessions[b].start_date)});
					structured_favorites[day] = day_favorites;
				}
			}

			sessions_data.favorites = structured_favorites;

			return new EJS({ text : TEMPLATES["FAVORITES"]}).render(sessions_data);
		} else {
			return new EJS({ text : TEMPLATES["ERROR"]}).render({ "id" : "favorites", "title" : sessions_data.loc["APPLE_EVENTS.WWDC2015_NO_FAV_TITLE"], "description" : sessions_data.loc["APPLE_EVENTS.WWDC2015_NO_FAV_DESC"]});
		}
	}

	function refreshFavorites(){
		console.log("Refresh Favorites page triggered...")
		var xml = loadFavorites();
		var new_fingerprint = fingerprint(xml);
		var new_xml = atv.parseXML(xml);

		var current_fingerprint = atvutils.data("favorites-hash");
		if (current_fingerprint && current_fingerprint != new_fingerprint){
			console.log("Refreshing favorites page...");
			atv.loadAndSwapXML(new_xml);
			atvutils.data("favorites-hash", new_fingerprint);
		}
	}

	function volatileFavoritesReload(old_document){
		console.log("VOLATILE LOL");

		var xml = loadFavorites();
		var new_fingerprint = fingerprint(xml);
		var new_xml = atv.parseXML(xml);

		console.log("checking favorites page for volatile reload");
		if (new_fingerprint != atvutils.data("favorites-hash")){
			console.log("refreshing favorites page");
			atv.loadAndSwapXML(new_xml);
			atvutils.data("favorites-hash", new_fingerprint)
		} else {
			atv.loadAndSwapXML(old_document);
		}
	}

	function loadSession(session_id){
		console.log("Loading session ", session_id);
		var sessions_data = loadFeedData();
		sessions_data["current_session_id"] = session_id;

		if (sessions_data.sessions[session_id].related.length == 0){
			var related_track = [];
			var track_sessions = sessions_data.tracks[sessions_data.sessions[session_id].track];

			// console.log(JSON.stringify(track_sessions));

			for (var d = 0; d < sessions_data.days.length; d++){
				var track_sessions_on_day = track_sessions[sessions_data.days[d]];

				if (track_sessions_on_day){
					// console.log(track_sessions_on_day);
					for (var t = 0; t < track_sessions_on_day.length; t++){
						var track = sessions_data.sessions[track_sessions_on_day[t]];
						// console.log(track.title, track.url);
						if (track.url != null){
							related_track.push(track.id);
						}
					}
				}
			}
			if (related_track.length > 0){
				console.log(JSON.stringify(related_track));
				sessions_data.sessions[session_id]["related_track"] = related_track;
			}
		}

		// console.log(JSON.stringify(sessions_data.sessions[session_id]));

		return new EJS({ text : TEMPLATES["SESSION"]}).render(sessions_data);
	}

	function showSession(session_id){
		console.log("attempting to show ", session_id);

		var proxy = new atv.ProxyDocument();
		proxy.show();

		var xml = loadSession(session_id);

		atvutils.data(session_id + "-hash", fingerprint(xml));

		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1)
	}

	function volatileSessionReload(old_document){
		var id = old_document.rootElement.getElementByTagName("itemDetail").getAttribute("id");
		var xml = loadSession(id);

		var new_fingerprint = fingerprint(xml);
		var new_xml = atv.parseXML(xml);

		console.log("checking session page for volatile reload");
		if (new_fingerprint != atvutils.data(id + "-hash")){
			console.log("refreshing session page");
			atv.loadAndSwapXML(new_xml);
			atvutils.data(id + "-hash", new_fingerprint)
		}
	}

	function showSessionStream(session_id){
		var sessions_data = loadFeedData();

		var proxy = new atv.ProxyDocument();
		proxy.show();

		var session = sessions_data.sessions[session_id];

		var stream_data = {
			"id" : session_id,
			"url" : session.url,
			"title" : session.title,
			"description" : session.description,
			"image" : session.images.playback,
			"indefiniteDuration" : false,
			"bookmark" : videoBookmark(session_id)
		}

		var xml = new EJS({ text : TEMPLATES["WATCH"]}).render(stream_data);

		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1)
	}

	function showLiveSessionStream(session_id){
		var sessions_data = loadFeedData();

		var proxy = new atv.ProxyDocument();
		proxy.show();

		var session = sessions_data.sessions[session_id];

		var stream_data = {
			"id" : session_id,
			"url" : sessions_data.live_stream_url,
			"title" : session.title,
			"description" : session.description,
			"image" : session.images.playback,
			"indefiniteDuration" : true
		}

		var xml = new EJS({ text : TEMPLATES["WATCH"]}).render(stream_data);

		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1)
	}

	function showSessionStreamIfAvailable(session_id){
		var sessions_data = loadFeedData();

		if (sessions_data.sessions[session_id].url){
			showSessionStream(session_id);
		}
	}

	function showBluedot(session_id){
		var sessions_data = loadFeedData();
		var session = sessions_data.sessions[session_id];

		if (session.url != null){
			var proxy = new atv.ProxyDocument();
			proxy.show();

			var xml = new EJS({ text : TEMPLATES["BLUEDOT"]}).render({ "id" : session_id, "title" : session.title, "loc" : sessions_data.loc });

			atv.setTimeout(function(){
				proxy.loadXML(atv.parseXML(xml));
			}, 1)
		}
	}

	function showEvent(event_id){
		console.log("attempting to show ",event_id);

		var proxy = new atv.ProxyDocument();
		proxy.show();

		console.log("SHOWN PROXY");

		var xml = loadEvent(event_id);

		console.log("EVENT LOADED");

		atvutils.data(event_id + "-hash", fingerprint(xml));
		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1)
	}

	function loadEvent(event_id){
		var event = EVENTS[event_id];

        console.log("Generating initial xml.");
		if (event.uber){
			var event_data = buildEventObj(event_id, event, true);
			var ejs_xml = new EJS({ text : TEMPLATES["EVENT_UBER"]}).render(event_data);
		} else {
			var event_data = buildEventObj(event_id, event, false)
    		var ejs_xml = new EJS({ text : TEMPLATES["EVENT"]}).render(event_data);

		}
		return ejs_xml;
	}

	function buildEventObj(event_id, event, uber){
		var language = atvutils.data("language");
		var language = atvutils.data("language");
		var state = atvutils.data("state");

		console.log("Constructing loc keys");

		if (event.live){
			if (state == "PRE" || state == "LIVE"){
				var title = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_TITLE_LIVE"];
				var summary = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_DESC_LIVE"];
			} else if (state == "INTERIM"){
				var title = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_TITLE"];
				var summary = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_DESC_INTERIM"];
			} else if (state == "POST"){
				var title = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_TITLE"];
				var summary = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_DESC_POST"];
			}

		} else {
	        var title = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_TITLE"];
	        var summary = LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_DESC"];
		}

        var date = formatTime(event.countdown, "date");

        var play = LOCALIZATION[language]["APPLE_EVENTS.BUTTON_PLAY"];
        var section = LOCALIZATION[language]["APPLE_EVENTS.SECTION_HEADER"];

        var image = atvutils.data("base-url") + "images/" + event_id + ".jpg";

        if (uber){
        	var uber720p = atvutils.data("base-url") + "images/" + event_id + ".UBER.720p.png";
	        var uber1080p = atvutils.data("base-url") + "images/" + event_id + ".UBER.1080p.png";
        }

        var selectedEvents = otherEvents(event_id);

        if (uber){
        	return {
            "id" : event_id,
            "title" : title,
            "summary" : localizeTimeInString(event.countdown, summary),
            "image" : image,
            "uber720p" : uber720p,
            "uber1080p" : uber1080p,
            "location" : LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_LOCATION"],
            "date" : date,
            "time" : formatTime(event.countdown, "TIME"),
            "play" : play,
	        "later" : (state == "PRE") ? LOCALIZATION[language]["APPLE_EVENTS.BUTTON_TIME"] : LOCALIZATION[language]["APPLE_EVENTS.BUTTON_COMING_SOON"],
	        "useCountdown" : (state == "PRE") ? ((new Date(event["countdown"]) > new Date()) ? true : false) : false,
            "hd" : event.hd,
	        "playable" : (event.live) ? ((state == "LIVE" || state == "POST") ? true : false) : true,
	        "showTime" : (state == "PRE" || state == "LIVE") ? true : false,
            "smallCollectionDivider_title" : section,
            "events" : selectedEvents
	        };
        } else {
        	return {
	            "id" : event_id,
	            "title" : title,
	            "summary" : localizeTimeInString(event.countdown, summary),
	            "image" : image,
	            "date" : date,
	            "play" : play,
	            "hd" : event.hd,
	            "smallCollectionDivider_title" : section,
	            "events" : selectedEvents
	        };
        }

	}

	function otherEvents(currentEvent){
		var language = atvutils.data("language");
		var state = atvutils.data("state");

		var selectedEvents = [];

		for (event in EVENTS){
			if (event != currentEvent){
				var eventDict = {};
				eventDict.title = LOCALIZATION[language]["APPLE_EVENTS." + event + "_TITLE_SHORT"];
				eventDict.id = event;
				eventDict.image = atvutils.data("base-url") + "images/" + event + ".jpg";
                eventDict.live = EVENTS[event].live;
                eventDict.order = EVENTS[event]["order"];
				selectedEvents.push(eventDict);
			}
		}

		selectedEvents.sort(function(a, b){
			if (a.order > b.order){
				return 1;
			} else if (a.order < b.order){
				return -1;
			}
			return 0;
		});

		return selectedEvents;
	}

	function watch(event_id){
		var language = atvutils.data("language");
		var state = atvutils.data("state");

		var event = EVENTS[event_id];

		if (event.live && event.uber){
			if (state == "LIVE"){
				var url = event["live-url"];
			} else if (state == "POST"){
				var url = event["vod-url"];
			} else {
				console.log("State is ", state, ". No playback possible.");
				showError(event_id);
				return;
			}
		} else {
			var url = event.url;
		}

		console.log("Checking for valid playlist at ", url);

		var ajax = new ATVUtils.Ajax({
			"url" : url,
			"success" : function(xhr){
				console.log("Playlist exists.");
				showStream(event_id);
			},
			"failure" : function(status, xhr){
				console.log("Failed to find a valid playlist at ", url);
				showError(event_id);
			}
		});
	}

	function showStream(event_id){
		var proxy = new atv.ProxyDocument();
		proxy.show();

		var xml = loadStream(event_id);

		console.log(xml);

		atvutils.data(event_id + "-hash", fingerprint(xml));
		proxy.loadXML(atv.parseXML(xml));
	}

	function loadStream(event_id){
		var language = atvutils.data("language");
		var state = atvutils.data("state");

		var event = EVENTS[event_id];

		if (event.live && event.uber){
			if (state == "LIVE"){
				var url = event["live-url"];
				var indefiniteDuration = true;
			} else if (state == "POST"){
				var url = event["vod-url"];
				var indefiniteDuration = false;
			} else {
				console.log("State is ", state, ". No playback possible.");
				showError(event_id);
				return;
			}
		} else {
			var url = event.url;
		}

		if (event.live && state == "LIVE"){
			var event_data = {
				"id" : event_id + "-LIVE",
				"title" : LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_TITLE_" + state],
				"description" : localizeTimeInString(event.countdown, LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_DESC_" + state]),
				"image" : atvutils.data("base-url") + "images/" + event_id + ".jpg",
				"url" : url,
				"indefiniteDuration" : indefiniteDuration,
				"bookmark" : (indefiniteDuration) ? 0 : videoBookmark(event_id)
			}
		} else {
			var event_data = {
				"id" : event_id,
				"title" : LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_TITLE"],
				"description" : localizeTimeInString(event.countdown, LOCALIZATION[language]["APPLE_EVENTS." + event_id + "_DESC"]),
				"image" : atvutils.data("base-url") + "images/" + event_id + ".jpg",
				"url" : url,
				"indefiniteDuration" : false,
				"bookmark" : videoBookmark(event_id)
			}
		}

		var ejs_xml = new EJS({ text : TEMPLATES["WATCH"]}).render(event_data);
		return ejs_xml;
	}

	function showError(event_id){
		console.log("Showing error.");

		var proxy = new atv.ProxyDocument();
		proxy.show();
		console.log(event_id);
		var xml = loadError(event_id);

		console.log(xml);

		atv.setTimeout(function(){
			proxy.loadXML(atv.parseXML(xml));
		}, 1);
	}

	function loadError(event_id){
		var language = atvutils.data("language");
		var state = atvutils.data("state");

		var title = LOCALIZATION[language]["APPLE_EVENTS.DIALOG_ERROR_TITLE"];

		if (state == "PRE" || state == "LIVE"){
			var description = LOCALIZATION[language]["APPLE_EVENTS.WWDC2015_DESC_LIVE"];
		} else if (state == "INTERIM"){
			var description = LOCALIZATION[language]["APPLE_EVENTS.WWDC2015_DESC_INTERIM"];
		} else {
			var description = LOCALIZATION[language]["APPLE_EVENTS.DIALOG_ERROR_EXPLANATION"];
		}

		console.log(event_id);

		var error_dict = {
			"id" : "generic-error",
			"title" : title,
			"description" : localizeTimeInString(EVENTS[event_id].countdown, description)
		}

		var ejs_xml = new EJS({ text : TEMPLATES["ERROR"]}).render(error_dict);

		return ejs_xml;
	}

	function videoBookmark(vod_id){
		var bookmarks = atvutils.data("bookmarks");

		if (!bookmarks){
			return 0;
		}

		var bookmark = bookmarks[vod_id];
		return (bookmark) ? bookmark : 0;
	}

	function isVideoSeen(vod_id){
		var data = loadFeedData();

		if (EVENTS[vod_id]){
			console.log("Checking events dictionary...");
			var length = EVENTS[vod_id].duration;
			if (length >= 20 * 60){
				return videoBookmark(vod_id) > (length - 120);
			} else {
				return videoBookmark(vod_id) > (length - 10);
			}
		} else if (data.sessions[vod_id]){
			console.log("Checking sessions dictionary...");
			var length = data.sessions[vod_id].duration;
			if (length >= 20 * 60){
				return videoBookmark(vod_id) > (length - 120);
			} else {
				return videoBookmark(vod_id) > (length - 10);
			}
		} else {
			console.log("Video id ", vod_id, " not found.");
			return false;
		}
	}

	function isVideoUnseen(vod_id){
		return (videoBookmark(vod_id) <= 15) ? true : false;
	}

	function isVideoPartiallySeen(vod_id){
		return !isVideoSeen(vod_id) && !isVideoUnseen(vod_id);
	}

	function markVodWatched(vod_id){
		console.log(vod_id);

		var session = loadFeedData()["sessions"][vod_id];

		var bookmarks = atvutils.data("bookmarks");

		if (bookmarks == null){
			var bookmarks = {};
		}

		bookmarks[vod_id] = session.duration;
		atvutils.data("bookmarks", bookmarks);

		atv.unloadPage();
	}

	function markVodUnwatched(vod_id){
		var bookmarks = atvutils.data("bookmarks");

		bookmarks[vod_id] = 0;

		atvutils.data("bookmarks", bookmarks);

		console.log(bookmarks);

		atv.unloadPage();
	}

	function markAllVodsWatched(){
		var data = loadFeedData();
		var sessions = data.sessions;
		for (session in sessions){
			// console.log(session);
			if (sessions[session].url != null && sessions[session].duration != null){
				markVodWatched(sessions[session].id);
			}
		}
		atv.unloadPage();
	}

	function markAllVodsUnwatched(){
		var data = loadFeedData();
		var sessions = data.sessions;
		for (session in sessions){
			// console.log(session);
			if (sessions[session].url != null && sessions[session].duration != null){
				markVodUnwatched(sessions[session].id);
			}
		}
		atv.unloadPage();
	}

	function addSessionToFavorites(session_id){
		if (atvutils.data("favorites")){
			var favorites = atvutils.data("favorites");
		} else {
			var favorites = [];
		}

		favorites.push(session_id);
		atvutils.data("favorites", favorites);
		console.log("Favorites: ", favorites);
	}

	function removeSessionFromFavorites(session_id){
		if (atvutils.data("favorites")){
			var favorites = atvutils.data("favorites");
			favorites.splice(favorites.indexOf(session_id), 1);
			atvutils.data("favorites", favorites);
			console.log("Favorites: ", favorites);
		}
	}

	function toggleSessionFavoriteStatus(session_id){
		var sessions_data = loadFeedData();
		if (isSessionInFavorites(session_id)){
			addSessionToFavorites(session_id);
			document.getElementById("favorite").getElementByTagName("title").textContent = sessions_data.loc["APPLE_EVENTS.BUTTON_REMOVE"];
		} else {
			removeSessionFromFavorites(session_id);
			document.getElementById("favorite").getElementByTagName("title").textContent = sessions_data.loc["APPLE_EVENTS.BUTTON_ADD"]
		}
	}

	function isSessionInFavorites(session_id){
		if (atvutils.data("favorites")){
			return((atvutils.data("favorites").indexOf(session_id) == -1) ? true : false);
		} else {
			return true;
		}
	}

	function startPolling(event_id){
		var sessions_data = loadFeedData();

		if (EVENTS[event_id] && EVENTS[event_id].live == true){
			console.log("Starting state of events polling...");
			atv.clearTimeout(pollingTimer);

			var duration = REFRESH_INTERVAL;

			pollingTimer = atv.setInterval(function(){
				pollEventState(event_id);
			}, duration);
			console.log("...started.");
		} else if (sessions_data && sessions_data.sessions[event_id]){
			console.log("Starting refresh timer...");

			var duration = REFRESH_INTERVAL;

			pollingTimer = atv.setInterval(function(){
				refreshSessionIfNecessary(event_id);
			}, duration);
			console.log("...started.");
		}
	}

	function stopPolling(){
		if (pollingTimer != null){
			console.log("Stopping polling...");
			atv.clearTimeout(pollingTimer);
			console.log("...stopped.");
		}
	}

	function pollEventState(event_id){
		var ajax = new ATVUtils.Ajax({
			"url" : atvutils.data("base-url") + atvutils.data("state-file"),
			"success" : function(req){
				var state = JSON.parse(req.responseText)["state"].toUpperCase();
				if (state != atvutils.data("state")){
					atvutils.data("state", state);
					refreshIfNecessary(event_id);
				}
			},
			"failure" : function(status, xhr){
				console.log("Failed to fetch the state file. ", status, xhr);
			}
		});
	}

	function refreshIfNecessary(event_id){
		var xml = loadEvent(event_id);
		var new_fingerprint = fingerprint(xml);

		console.log("Checking to see if page requires refresh...");
		if (new_fingerprint != atvutils.data(event_id + "-hash")){
			console.log("...refreshing...");
			atv.loadAndSwapXML(atv.parseXML(xml));
			atvutils.data(event_id + "-hash", new_fingerprint);
			console.log("...refreshed.");
		}
	}

	function refreshSessionIfNecessary(event_id){
		var xml = loadSession(event_id);
		var new_fingerprint = fingerprint(xml);

		console.log("Checking to see if session requires refresh...");
		if (new_fingerprint != atvutils.data(event_id + "-hash")){
			console.log("...refreshing...");
			atv.loadAndSwapXML(atv.parseXML(xml));
			atvutils.data(event_id + "-hash", new_fingerprint);
			console.log("...refreshed.");
		}
	}

	function zeroPad(n){
		return (n < 10) ? "0" + n : n;
	}

	function startCountdown(event_id){
		var sessions_data = loadFeedData();
		if (EVENTS[event_id] && EVENTS[event_id].live){
			var event = EVENTS[event_id];
			var state = atvutils.data("state");
			var target = new Date(event["countdown"]);
		} else if (sessions_data.sessions[event_id] && sessions_data.sessions[event_id].live_streamed == true) {
			var event = sessions_data.sessions[event_id];
			var state = "PRE";
			var target = new Date(event.start_date);
		} else {
			return;
		}

		var row = document.getElementById("countdown");
		if (row){
			var label = row.childElements[0];
		}

		var language = atvutils.data("language");
		var text_label = LOCALIZATION[language]["APPLE_EVENTS.COUNTER"];
		var format = LOCALIZATION[language]["APPLE_EVENTS.COUNTDOWN_TIMER"];
		var format_requires_zero_pad = (format.indexOf(":") != -1) ? true : false;

		if (state == "PRE"){
			if (label){
				console.log("Starting countdown...");
				countdownTimer = atv.setInterval(function(){
					var now = new Date();
					var remaining = target - now;
					var mils = remaining;

					var days, hours, minutes, seconds;

					days = Math.floor(mils / MILS_IN_DAY);
				    mils -= (days * MILS_IN_DAY);

				    hours = Math.floor(mils / MILS_IN_HOUR);
				    mils -= (hours * MILS_IN_HOUR);

				    minutes = Math.floor(mils / MILS_IN_MINUTE);
				    mils -= (minutes * MILS_IN_MINUTE);

				    seconds = Math.floor(mils / MILS_IN_SECOND);
				    mils -= (seconds * MILS_IN_SECOND);

					if (remaining <= 0){
						label.textContent = "";
						atv.clearInterval(interval);
					} else {
						if (format_requires_zero_pad){
							days = zeroPad(days);
							hours = zeroPad(hours);
							minutes = zeroPad(minutes);
							seconds = zeroPad(seconds);
						}

						label.textContent = text_label + " ";
						if (days > 0 || format_requires_zero_pad){
							label.textContent += format.replace("@@SECONDS@@", seconds).replace("@@MINUTES@@", minutes).replace("@@HOURS@@", hours).replace("@@DAYS@@", days);
						} else if (!(hours == 0 && days == 0)) {
							label.textContent += format.substring(format.indexOf("@@HOURS@@")).replace("@@SECONDS@@", seconds).replace("@@MINUTES@@", minutes).replace("@@HOURS@@", hours);
						} else if (!(hours == 0 && days == 0 && minutes == 0)) {
							label.textContent += format.substring(format.indexOf("@@MINUTES@@")).replace("@@SECONDS@@", seconds).replace("@@MINUTES@@", minutes);
						} else {
							label.textContent += format.substring(format.indexOf("@@SECONDS@@")).replace("@@SECONDS@@", seconds);
						}
					}
				}, 1000);
			}
		}
	}

	function stopCountdown(event_id){
		console.log("Stopping countdown...");
		atv.clearTimeout(countdownTimer);
		console.log("...stopped.");
	}

	function loadFeedData(){
		if (!feedData) {
			console.log("--- Initializing local copy of feed for this controller. ---");
			feedData = atvutils.data("sessions_data");

			if (feedData){
				feedData.loc = LOCALIZATION[atvutils.data("language")];
			}
		} else if (atvutils.data("content-last-modified") != feedData.contentLastModified){
			console.log("--- Updating local copy of feed for this controller. ---");
			feedData = atvutils.data("sessions_data");

			if (feedData){
				feedData.loc = LOCALIZATION[atvutils.data("language")];
			}
		}
		console.log("--- Returning local copy of feed for use. ---");

		if (feedData){
			feedData.phase = atvutils.data("phase");
		}

		return feedData;
	}

	return {
		"formatTime"							: formatTime,
		"showNav"								: showNav,
		"onNavigate"							: onNavigate,
		"refreshLive"							: refreshLive,
		"volatileLiveReload"					: volatileLiveReload,
		"refreshSchedule"						: refreshSchedule,
		"volatileScheduleReload"				: volatileScheduleReload,
		"scheduleDidNavigate" 					: scheduleDidNavigate,
		"showTrack"								: showTrack,
		"refreshTrack"							: refreshTrack,
		"volatileTrackReload"					: volatileTrackReload,
		"trackDidNavigate"						: trackDidNavigate,
		"refreshFavorites"						: refreshFavorites,
		"volatileFavoritesReload"				: volatileFavoritesReload,
		"showSession"							: showSession,
		"volatileSessionReload"					: volatileSessionReload,
		"showSessionStream"						: showSessionStream,
		"showLiveSessionStream"					: showLiveSessionStream,
		"showSessionStreamIfAvailable"			: showSessionStreamIfAvailable,
		"showBluedot"							: showBluedot,
		"showEvent"	  							: showEvent,
		"watch"		  							: watch,
		"showError"	  							: showError,
		"isVideoSeen" 							: isVideoSeen,
		"isVideoUnseen"							: isVideoUnseen,
		"isVideoPartiallySeen"					: isVideoPartiallySeen,
		"markVodWatched"		 				: markVodWatched,
		"markVodUnwatched"       				: markVodUnwatched,
		"markAllVodsWatched"     				: markAllVodsWatched,
		"markAllVodsUnwatched"   				: markAllVodsUnwatched,
		"startPolling"							: startPolling,
		"stopPolling" 							: stopPolling,
		"startCountdown" 						: startCountdown,
		"stopCountdown" 						: stopCountdown,
		"toggleSessionFavoriteStatus"			: toggleSessionFavoriteStatus,
		"removeSessionFromFavorites"			: removeSessionFromFavorites,
		"isSessionInFavorites" 					: isSessionInFavorites,
		"isThereAtleastOneRemainingLiveSession" : isThereAtleastOneRemainingLiveSession
	}
})();

atv.onPageLoad = function(pageIdentifier) {
	eventController.startPolling(pageIdentifier);
	eventController.startCountdown(pageIdentifier);
}

atv.onPageUnload = function(pageIdentifier) {
	eventController.stopPolling();
	eventController.stopCountdown();
}

atv.onPageExhumed = function( pageIdentifier ) {
	eventController.startPolling(pageIdentifier);
	eventController.startCountdown(pageIdentifier);
}

atv.onPageBuried = function( pageIdentifier ) {
	eventController.stopPolling();
	eventController.stopCountdown();
}

// ***************************************************
// ATVUtils - a JavaScript helper library for Apple TV
var atvutils = ATVUtils = {
	makeRequest: function(url, method, headers, body, callback) {
		if ( !url ) {
			throw "loadURL requires a url argument";
		}

		var method = method || "GET",
		headers = headers || {},
		body = body || "";

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			try {
				if (xhr.readyState == 4 ) {
					if ( xhr.status == 200) {
						callback(xhr.responseXML);
					} else {
						// console.log("makeRequest received HTTP status " + xhr.status + " for " + url);
						callback(null);
					}
				}
			} catch (e) {
				// console.error('makeRequest caught exception while processing request for ' + url + '. Aborting. Exception: ' + e);
				xhr.abort();
				callback(null);
			}
		}
		xhr.open(method, url, true);

		for(var key in headers) {
			xhr.setRequestHeader(key, headers[key]);
		}

		xhr.send();
		return xhr;
	},

	makeErrorDocument: function(message, description) {
		if ( !message ) {
			message = "";
		}
		if ( !description ) {
			description = "";
		}

		var errorXML = '<?xml version="1.0" encoding="UTF-8"?> \
		<atv> \
		<body> \
		<dialog id="com.sample.error-dialog"> \
		<title><![CDATA[' + message + ']]></title> \
		<description><![CDATA[' + description + ']]></description> \
		</dialog> \
		</body> \
		</atv>';

		return atv.parseXML(errorXML);
	},

	siteUnavailableError: function() {
	    // TODO: localize
	    return this.makeErrorDocument("sample-xml is currently unavailable. Try again later.", "Go to sample-xml.com/appletv for more information.");
	},

	loadError: function(message, description) {
		atv.loadXML(this.makeErrorDocument(message, description));
	},

	loadAndSwapError: function(message, description) {
		atv.loadAndSwapXML(this.makeErrorDocument(message, description));
	},

	loadURLInternal: function(url, method, headers, body, loader) {
		var me = this,
		xhr,
		proxy = new atv.ProxyDocument;

		proxy.show();

		proxy.onCancel = function() {
			if ( xhr ) {
				xhr.abort();
			}
		};

		xhr = me.makeRequest(url, method, headers, body, function(xml) {
			try {
				loader(proxy, xml);
			} catch(e) {
				console.error("Caught exception in for " + url + ". " + e);
				loader(me.siteUnavailableError());
			}
		});
	},

	loadURL: function( options ) { //url, method, headers, body, processXML) {
		var me = this;
		if( typeof( options ) === "string" ) {
			var url = options;
		} else {
			var url = options.url,
			method = options.method || null,
			headers = options.headers || null,
			body = options.body || null,
			processXML = options.processXML || null;
		}

		this.loadURLInternal(url, method, headers, body, function(proxy, xml) {
			if(typeof(processXML) == "function") processXML.call(this, xml);
			try {
				proxy.loadXML(xml, function(success) {
					if ( !success ) {
						console.log("loadURL failed to load " + url);
						proxy.loadXML(me.siteUnavailableError());
					}
				});
			} catch (e) {
				console.log("loadURL caught exception while loading " + url + ". " + e);
				proxy.loadXML(me.siteUnavailableError());
			}
		});
	},

	// loadAndSwapURL can only be called from page-level JavaScript of the page that wants to be swapped out.
	loadAndSwapURL: function( options ) { //url, method, headers, body, processXML) {
		var me = this;
		if( typeof( options ) === "string" ) {
			var url = options;
		} else {
			var url = options.url,
			method = options.method || null,
			headers = options.headers || null,
			body = options.body || null,
			processXML = options.processXML || null;
		}

		this.loadURLInternal(url, method, headers, body, function(proxy, xml) {
			if(typeof(processXML) == "function") processXML.call(this, xml);
			try {
				proxy.loadXML(xml, function(success) {
					if ( success ) {
						atv.unloadPage();
					} else {
						console.log("loadAndSwapURL failed to load " + url);
						proxy.loadXML(me.siteUnavailableError(), function(success) {
							if ( success ) {
								atv.unloadPage();
							}
						});
					}
				});
			} catch (e) {
				console.error("loadAndSwapURL caught exception while loading " + url + ". " + e);
				proxy.loadXML(me.siteUnavailableError(), function(success) {
					if ( success ) {
						atv.unloadPage();
					}
				});
			}
		});
	},

	/**
	 * Used to manage setting and retrieving data from local storage
	 */
	 data: function(key, value) {
	 	if(key && value) {
	 		try {
	 			atv.localStorage.setItem(key, value);
	 			return value;
	 		} catch(error) {
	 			console.error('Failed to store data element: '+ error);
	 		}

	 	} else if(key) {
	 		try {
	 			return atv.localStorage.getItem(key);
	 		} catch(error) {
	 			console.error('Failed to retrieve data element: '+ error);
	 		}
	 	}
	 	return null;
	 },

	 deleteData: function(key) {
	 	try {
	 		atv.localStorage.removeItem(key);
	 	} catch(error) {
	 		console.error('Failed to remove data element: '+ error);
	 	}
	 },


	/**
	 * @params options.name - string node name
	 * @params options.text - string textContent
	 * @params options.attrs - array of attribute to set {"name": string, "value": string, bool}
	 * @params options.children = array of childNodes same values as options
	 * @params doc - document to attach the node to
	 * returns node
	 */
	 createNode: function(options, doc) {
	 	var doc = doc || document;
	 	options = options || {};

	 	if(options.name && options.name != '') {
	 		var newElement = doc.makeElementNamed(options.name);

	 		if(options.text) newElement.textContent = options.text;

	 		if(options.attrs) {
	 			options.attrs.forEach(function(e, i, a) {
	 				newElement.setAttribute(e.name, e.value);
	 			}, this);
	 		}

	 		if(options.children) {
	 			options.children.forEach(function(e,i,a) {
	 				newElement.appendChild( this.createNode( e, doc ) );
	 			}, this)
	 		}

	 		return newElement;
	 	}
	 },

	 validEmailAddress: function( email ) {
	 	var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
	 	isValid = email.search( emailRegex );
	 	return ( isValid > -1 );
	 },

	 softwareVersionIsAtLeast: function( version ) {
	 	var deviceVersion = atv.device.softwareVersion.split('.'),
	 	requestedVersion = version.split('.');

		// We need to pad the device version length with "0" to account for 5.0 vs 5.0.1
		if( deviceVersion.length < requestedVersion.length ) {
			var difference = requestedVersion.length - deviceVersion.length,
			dvl = deviceVersion.length;

			for( var i = 0; i < difference; i++ ) {
				deviceVersion[dvl + i] =  "0";
			};
		};

		// compare the same index from each array.
		for( var c = 0; c < deviceVersion.length; c++ ) {
			var dv = deviceVersion[c],
			rv = requestedVersion[c] || "0";

			if( parseInt( dv ) > parseInt( rv ) ) {
				return true;
			} else if( parseInt( dv ) < parseInt( rv )  ) {
				return false;
			};
		};

		// If we make it this far the two arrays are identical, so we're true
		return true;
	},

	shuffleArray: function( arr ) {
		var tmp, current, top = arr.length;

		if(top) {
			while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = arr[current];
				arr[current] = arr[top];
				arr[top] = tmp;
			};
		};

		return arr;
	},

	loadTextEntry: function( textEntryOptions ) {
		var textView = new atv.TextEntry;

		textView.type              = textEntryOptions.type             || "emailAddress";
		textView.title             = textEntryOptions.title            || "";
		textView.image             = textEntryOptions.image            || null;
		textView.instructions      = textEntryOptions.instructions     || "";
		textView.label             = textEntryOptions.label            || "";
		textView.footnote          = textEntryOptions.footnote         || "";
		textView.defaultValue      = textEntryOptions.defaultValue     || null;
		textView.defaultToAppleID  = textEntryOptions.defaultToAppleID || false;
		textView.onSubmit          = textEntryOptions.onSubmit,
		textView.onCancel          = textEntryOptions.onCancel,

		textView.show();
	},

	log: function ( message , level ) {
		var debugLevel = atv.sessionStorage.getItem( "DEBUG_LEVEL" ),
		level = level || 0;

		if( level <= debugLevel ) {
			console.log( message );
		}
	},

	accessibilitySafeString: function ( string ) {
		var string = unescape( string );

		string = string
				.replace( /&amp;/g, 'and' )
				.replace( /&/g, 'and' )
				.replace( /&lt;/g, 'less than' )
				.replace( /\</g, 'less than' )
				.replace( /&gt;/g, 'greater than' )
				.replace( /\>/g, 'greater than' );

		return string;
	}
};

// Extend atv.ProxyDocument to load errors from a message and description.
if( atv.ProxyDocument ) {
	atv.ProxyDocument.prototype.loadError = function(message, description) {
		var doc = atvutils.makeErrorDocument(message, description);
		this.loadXML(doc);
	}
}


// atv.Document extensions
if( atv.Document ) {
	atv.Document.prototype.getElementById = function(id) {
		var elements = this.evaluateXPath("//*[@id='" + id + "']", this);
		if ( elements && elements.length > 0 ) {
			return elements[0];
		}
		return undefined;
	}
}


// atv.Element extensions
if( atv.Element ) {
	atv.Element.prototype.getElementsByTagName = function(tagName) {
		return this.ownerDocument.evaluateXPath("descendant::" + tagName, this);
	}

	atv.Element.prototype.getElementByTagName = function(tagName) {
		var elements = this.getElementsByTagName(tagName);
		if ( elements && elements.length > 0 ) {
			return elements[0];
		}
		return undefined;
	}
}

// Simple Array Sorting methods
Array.prototype.sortAsc = function() {
	this.sort(function( a, b ){
		return a - b;
	});
};

Array.prototype.sortDesc = function() {
	this.sort(function( a, b ){
		return b - a;
	});
};


// Date methods and properties
Date.lproj = {
	"DAYS": {
		"en": {
			"full": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			"abbrv": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		},
		"en_GB": {
			"full": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			"abbrv": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		}
	},
	"MONTHS": {
		"en": {
			"full": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			"abbrv": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		"en_GB": {
			"full": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			"abbrv": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		}
	}
}

Date.prototype.getLocaleMonthName = function( type ) {
	var language = atv.device.language,
	type = ( type === true ) ? "abbrv" : "full",
	MONTHS = Date.lproj.MONTHS[ language ] || Date.lproj.MONTHS[ "en" ];

	return MONTHS[ type ][ this.getMonth() ];
};

Date.prototype.getLocaleDayName = function( type ) {
	var language = atv.device.language,
	type = ( type === true ) ? "abbrv" : "full",
	DAYS = Date.lproj.DAYS[ language ] || Date.lproj.DAYS[ "en" ];

	return DAYS[ type ][ this.getDay() ];
};

Date.prototype.nextDay = function( days ) {
	var oneDay = 86400000,
	days = days || 1;
	this.setTime( new Date( this.valueOf() + ( oneDay * days ) ) );
};

Date.prototype.prevDay = function( days ) {
	var oneDay = 86400000,
	days = days || 1;
	this.setTime( new Date( this.valueOf() - ( oneDay * days ) ) );
};


// String Trim methods
String.prototype.trim = function ( ch )
{
	var ch = ch || '\\s',
	s = new RegExp( '^['+ch+']+|['+ch+']+$','g');
	return this.replace(s,'');
};

String.prototype.trimLeft = function ( ch )
{
	var ch = ch || '\\s',
	s = new RegExp( '^['+ch+']+','g');
	return this.replace(s,'');
};

String.prototype.trimRight = function ( ch )
{
	var ch = ch || '\\s',
	s = new RegExp( '['+ch+']+$','g');
	return this.replace(s,'');
};

String.prototype.xmlEncode = function()
{
	var string = unescape( this );

	string = string
			.replace( /&/g, '&amp;' )
			.replace( /\</g, '&lt;' )
			.replace( /\>/g, '&gt;' );

	return string;
};

// End ATVUtils

// ***************************************************
/**
 * This is an XHR handler. It handles most of tediousness of the XHR request
 * and keeps track of onRefresh XHR calls so that we don't end up with multiple
 * page refresh calls.
 *
 * You can see how I call it on the handleRefresh function below.
 *
 *
 * @params object (hash) $options
 * @params string $options.url - url to be loaded
 * @params string $options.method - "GET", "POST", "PUT", "DELTE"
 * @params bool $options.type - false = "Sync" or true = "Async" (You should always use true)
 * @params func $options.success - Gets called on readyState 4 & status 200
 * @params func $options.failure - Gets called on readyState 4 & status != 200
 * @params func $options.callback - Gets called after the success and failure on readyState 4
 * @params string $options.data - data to be sent to the server
 * @params bool $options.refresh - Is this a call from the onRefresh event.
 */
 ATVUtils.Ajax = function($options) {
	var me = this;
	$options = $options || {}

	/* Setup properties */
	this.url = $options.url || false;
	this.method = $options.method || "GET";
	this.type = ($options.type === false) ? false : true;
	this.success = $options.success || null;
	this.failure = $options.failure || null;
	this.data = $options.data || null;
	this.complete = $options.complete || null;
	this.refresh = $options.refresh || false;

	if(!this.url) {
		console.error('\nAjax Object requires a url to be passed in: e.g. { "url": "some string" }\n')
		return undefined;
	};

	this.id = Date.now();

	this.createRequest();

	this.req.onreadystatechange = this.stateChange;

	this.req.object = this;

	this.open();

	this.send();

};

ATVUtils.Ajax.currentlyRefreshing = false;
ATVUtils.Ajax.activeRequests = {};

ATVUtils.Ajax.prototype = {
	stateChange: function() {
		var me = this.object;
		switch(this.readyState) {
			case 1:
				if(typeof(me.connection) === "function") me.connection(this, me);
				break;
			case 2:
				if(typeof(me.received) === "function") me.received(this, me);
				break;
			case 3:
				if(typeof(me.processing) === "function") me.processing(this, me);
				break;
			case 4:
				if(this.status == "200") {
					if(typeof(me.success) === "function") me.success(this, me);
				} else {
					if(typeof(me.failure) === "function") me.failure(this.status, this, me);
				}
				if(typeof(me.complete) === "function") me.complete(this, me);
				if(me.refresh) Ajax.currentlyRefreshing = false;
				break;
			default:
				console.log("I don't think I should be here.");
				break;
		}
	},
	cancelRequest: function() {
		this.req.abort();
		delete ATVUtils.Ajax.activeRequests[ this.id ];
	},
	cancelAllActiveRequests: function() {
		for ( var p in ATVUtils.Ajax.activeRequests ) {
			if( ATVUtils.Ajax.activeRequests.hasOwnProperty( p ) ) {
				var obj = ATVUtils.Ajax.activeRequests[ p ];
				if( ATVUtils.Ajax.prototype.isPrototypeOf( obj ) ) {
					obj.req.abort();
				};
			};
		};
		ATVUtils.Ajax.activeRequests = {};
	},
	createRequest: function() {
		try {
			this.req = new XMLHttpRequest();
			ATVUtils.Ajax.activeRequests[ this.id ] = this;
			if(this.refresh) ATVUtils.Ajax.currentlyRefreshing = true;
		} catch (error) {
			alert("The request could not be created: </br>" + error);
			console.error("failed to create request: " +error);
		}
	},
	open: function() {
		try {
			this.req.open(this.method, this.url, this.type);
		} catch(error) {
			console.log("failed to open request: " + error);
		}
	},
	send: function() {
		var data = this.data || null;
		try {
			this.req.send(data);
		} catch(error) {
			console.log("failed to send request: " + error);
		}
	}
};


(function(){var rsplit=function(string,regex){var result=regex.exec(string),retArr=new Array(),first_idx,last_idx,first_bit;while(result!=null){first_idx=result.index;last_idx=regex.lastIndex;if((first_idx)!=0){first_bit=string.substring(0,first_idx);retArr.push(string.substring(0,first_idx));string=string.slice(first_idx)}retArr.push(result[0]);string=string.slice(result[0].length);result=regex.exec(string)}if(!string==""){retArr.push(string)}return retArr},chop=function(string){return string.substr(0,string.length-1)},extend=function(d,s){for(var n in s){if(s.hasOwnProperty(n)){d[n]=s[n]}}};EJS=function(options){options=typeof options=="string"?{view:options}:options;this.set_options(options);if(options.precompiled){this.template={};this.template.process=options.precompiled;EJS.update(this.name,this);return }if(options.element){if(typeof options.element=="string"){var name=options.element;options.element=document.getElementById(options.element);if(options.element==null){throw name+"does not exist!"}}if(options.element.value){this.text=options.element.value}else{this.text=options.element.innerHTML}this.name=options.element.id;this.type="["}else{if(options.url){options.url=EJS.endExt(options.url,this.extMatch);this.name=this.name?this.name:options.url;var url=options.url;var template=EJS.get(this.name,this.cache);if(template){return template}if(template==EJS.INVALID_PATH){return null}try{this.text=EJS.request(url+(this.cache?"":"?"+Math.random()))}catch(e){}if(this.text==null){throw ({type:"EJS",message:"There is no template at "+url})}}}var template=new EJS.Compiler(this.text,this.type);template.compile(options,this.name);EJS.update(this.name,this);this.template=template};EJS.prototype={render:function(object,extra_helpers){object=object||{};this._extra_helpers=extra_helpers;var v=new EJS.Helpers(object,extra_helpers||{});return this.template.process.call(object,object,v)},update:function(element,options){if(typeof element=="string"){element=document.getElementById(element)}if(options==null){_template=this;return function(object){EJS.prototype.update.call(_template,element,object)}}if(typeof options=="string"){params={};params.url=options;_template=this;params.onComplete=function(request){var object=eval(request.responseText);EJS.prototype.update.call(_template,element,object)};EJS.ajax_request(params)}else{element.innerHTML=this.render(options)}},out:function(){return this.template.out},set_options:function(options){this.type=options.type||EJS.type;this.cache=options.cache!=null?options.cache:EJS.cache;this.text=options.text||null;this.name=options.name||null;this.ext=options.ext||EJS.ext;this.extMatch=new RegExp(this.ext.replace(/\./,"."))}};EJS.endExt=function(path,match){if(!path){return null}match.lastIndex=0;return path+(match.test(path)?"":this.ext)};EJS.Scanner=function(source,left,right){extend(this,{left_delimiter:left+"%",right_delimiter:"%"+right,double_left:left+"%%",double_right:"%%"+right,left_equal:left+"%=",left_comment:left+"%#"});this.SplitRegexp=left=="["?/(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/:new RegExp("("+this.double_left+")|(%%"+this.double_right+")|("+this.left_equal+")|("+this.left_comment+")|("+this.left_delimiter+")|("+this.right_delimiter+"\n)|("+this.right_delimiter+")|(\n)");this.source=source;this.stag=null;this.lines=0};EJS.Scanner.to_text=function(input){if(input==null||input===undefined){return""}if(input instanceof Date){return input.toDateString()}if(input.toString){return input.toString()}return""};EJS.Scanner.prototype={scan:function(block){scanline=this.scanline;regex=this.SplitRegexp;if(!this.source==""){var source_split=rsplit(this.source,/\n/);for(var i=0;i<source_split.length;i++){var item=source_split[i];this.scanline(item,regex,block)}}},scanline:function(line,regex,block){this.lines++;var line_split=rsplit(line,regex);for(var i=0;i<line_split.length;i++){var token=line_split[i];if(token!=null){try{block(token,this)}catch(e){throw {type:"EJS.Scanner",line:this.lines}}}}}};EJS.Buffer=function(pre_cmd,post_cmd){this.line=new Array();this.script="";this.pre_cmd=pre_cmd;this.post_cmd=post_cmd;for(var i=0;i<this.pre_cmd.length;i++){this.push(pre_cmd[i])}};EJS.Buffer.prototype={push:function(cmd){this.line.push(cmd)},cr:function(){this.script=this.script+this.line.join("; ");this.line=new Array();this.script=this.script+"\n"},close:function(){if(this.line.length>0){for(var i=0;i<this.post_cmd.length;i++){this.push(pre_cmd[i])}this.script=this.script+this.line.join("; ");line=null}}};EJS.Compiler=function(source,left){this.pre_cmd=["var ___ViewO = [];"];this.post_cmd=new Array();this.source=" ";if(source!=null){if(typeof source=="string"){source=source.replace(/\r\n/g,"\n");source=source.replace(/\r/g,"\n");this.source=source}else{if(source.innerHTML){this.source=source.innerHTML}}if(typeof this.source!="string"){this.source=""}}left=left||"<";var right=">";switch(left){case"[":right="]";break;case"<":break;default:throw left+" is not a supported deliminator";break}this.scanner=new EJS.Scanner(this.source,left,right);this.out=""};EJS.Compiler.prototype={compile:function(options,name){options=options||{};this.out="";var put_cmd="___ViewO.push(";var insert_cmd=put_cmd;var buff=new EJS.Buffer(this.pre_cmd,this.post_cmd);var content="";var clean=function(content){content=content.replace(/\\/g,"\\\\");content=content.replace(/\n/g,"\\n");content=content.replace(/"/g,'\\"');return content};this.scanner.scan(function(token,scanner){if(scanner.stag==null){switch(token){case"\n":content=content+"\n";buff.push(put_cmd+'"'+clean(content)+'");');buff.cr();content="";break;case scanner.left_delimiter:case scanner.left_equal:case scanner.left_comment:scanner.stag=token;if(content.length>0){buff.push(put_cmd+'"'+clean(content)+'")')}content="";break;case scanner.double_left:content=content+scanner.left_delimiter;break;default:content=content+token;break}}else{switch(token){case scanner.right_delimiter:switch(scanner.stag){case scanner.left_delimiter:if(content[content.length-1]=="\n"){content=chop(content);buff.push(content);buff.cr()}else{buff.push(content)}break;case scanner.left_equal:buff.push(insert_cmd+"(EJS.Scanner.to_text("+content+")))");break}scanner.stag=null;content="";break;case scanner.double_right:content=content+scanner.right_delimiter;break;default:content=content+token;break}}});if(content.length>0){buff.push(put_cmd+'"'+clean(content)+'")')}buff.close();this.out=buff.script+";";var to_be_evaled="/*"+name+"*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {"+this.out+" return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";try{eval(to_be_evaled)}catch(e){if(typeof JSLINT!="undefined"){JSLINT(this.out);for(var i=0;i<JSLINT.errors.length;i++){var error=JSLINT.errors[i];if(error.reason!="Unnecessary semicolon."){error.line++;var e=new Error();e.lineNumber=error.line;e.message=error.reason;if(options.view){e.fileName=options.view}throw e}}}else{throw e}}}};EJS.config=function(options){EJS.cache=options.cache!=null?options.cache:EJS.cache;EJS.type=options.type!=null?options.type:EJS.type;EJS.ext=options.ext!=null?options.ext:EJS.ext;var templates_directory=EJS.templates_directory||{};EJS.templates_directory=templates_directory;EJS.get=function(path,cache){if(cache==false){return null}if(templates_directory[path]){return templates_directory[path]}return null};EJS.update=function(path,template){if(path==null){return }templates_directory[path]=template};EJS.INVALID_PATH=-1};EJS.config({cache:true,type:"<",ext:".ejs"});EJS.Helpers=function(data,extras){this._data=data;this._extras=extras;extend(this,extras)};EJS.Helpers.prototype={view:function(options,data,helpers){if(!helpers){helpers=this._extras}if(!data){data=this._data}return new EJS(options).render(data,helpers)},to_text:function(input,null_text){if(input==null||input===undefined){return null_text||""}if(input instanceof Date){return input.toDateString()}if(input.toString){return input.toString().replace(/\n/g,"<br />").replace(/''/g,"'")}return""}};EJS.newRequest=function(){var factories=[function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var i=0;i<factories.length;i++){try{var request=factories[i]();if(request!=null){return request}}catch(e){continue}}};EJS.request=function(path){var request=new EJS.newRequest();request.open("GET",path,false);try{request.send(null)}catch(e){return null}if(request.status==404||request.status==2||(request.status==0&&request.responseText=="")){return null}return request.responseText};EJS.ajax_request=function(params){params.method=(params.method?params.method:"GET");var request=new EJS.newRequest();request.onreadystatechange=function(){if(request.readyState==4){if(request.status==200){params.onComplete(request)}else{params.onComplete(request)}}};request.open(params.method,params.url);request.send(null)}})();EJS.Helpers.prototype.date_tag=function(C,O,A){if(!(O instanceof Date)){O=new Date()}var B=["January","February","March","April","May","June","July","August","September","October","November","December"];var G=[],D=[],P=[];var J=O.getFullYear();var H=O.getMonth();var N=O.getDate();for(var M=J-15;M<J+15;M++){G.push({value:M,text:M})}for(var E=0;E<12;E++){D.push({value:(E),text:B[E]})}for(var I=0;I<31;I++){P.push({value:(I+1),text:(I+1)})}var L=this.select_tag(C+"[year]",J,G,{id:C+"[year]"});var F=this.select_tag(C+"[month]",H,D,{id:C+"[month]"});var K=this.select_tag(C+"[day]",N,P,{id:C+"[day]"});return L+F+K};EJS.Helpers.prototype.form_tag=function(B,A){A=A||{};A.action=B;if(A.multipart==true){A.method="post";A.enctype="multipart/form-data"}return this.start_tag_for("form",A)};EJS.Helpers.prototype.form_tag_end=function(){return this.tag_end("form")};EJS.Helpers.prototype.hidden_field_tag=function(A,C,B){return this.input_field_tag(A,C,"hidden",B)};EJS.Helpers.prototype.input_field_tag=function(A,D,C,B){B=B||{};B.id=B.id||A;B.value=D||"";B.type=C||"text";B.name=A;return this.single_tag_for("input",B)};EJS.Helpers.prototype.is_current_page=function(A){return(window.location.href==A||window.location.pathname==A?true:false)};EJS.Helpers.prototype.link_to=function(B,A,C){if(!B){var B="null"}if(!C){var C={}}if(C.confirm){C.onclick=' var ret_confirm = confirm("'+C.confirm+'"); if(!ret_confirm){ return false;} ';C.confirm=null}C.href=A;return this.start_tag_for("a",C)+B+this.tag_end("a")};EJS.Helpers.prototype.submit_link_to=function(B,A,C){if(!B){var B="null"}if(!C){var C={}}C.onclick=C.onclick||"";if(C.confirm){C.onclick=' var ret_confirm = confirm("'+C.confirm+'"); if(!ret_confirm){ return false;} ';C.confirm=null}C.value=B;C.type="submit";C.onclick=C.onclick+(A?this.url_for(A):"")+"return false;";return this.start_tag_for("input",C)};EJS.Helpers.prototype.link_to_if=function(F,B,A,D,C,E){return this.link_to_unless((F==false),B,A,D,C,E)};EJS.Helpers.prototype.link_to_unless=function(E,B,A,C,D){C=C||{};if(E){if(D&&typeof D=="function"){return D(B,A,C,D)}else{return B}}else{return this.link_to(B,A,C)}};EJS.Helpers.prototype.link_to_unless_current=function(B,A,C,D){C=C||{};return this.link_to_unless(this.is_current_page(A),B,A,C,D)};EJS.Helpers.prototype.password_field_tag=function(A,C,B){return this.input_field_tag(A,C,"password",B)};EJS.Helpers.prototype.select_tag=function(D,G,H,F){F=F||{};F.id=F.id||D;F.value=G;F.name=D;var B="";B+=this.start_tag_for("select",F);for(var E=0;E<H.length;E++){var C=H[E];var A={value:C.value};if(C.value==G){A.selected="selected"}B+=this.start_tag_for("option",A)+C.text+this.tag_end("option")}B+=this.tag_end("select");return B};EJS.Helpers.prototype.single_tag_for=function(A,B){return this.tag(A,B,"/>")};EJS.Helpers.prototype.start_tag_for=function(A,B){return this.tag(A,B)};EJS.Helpers.prototype.submit_tag=function(A,B){B=B||{};B.type=B.type||"submit";B.value=A||"Submit";return this.single_tag_for("input",B)};EJS.Helpers.prototype.tag=function(C,E,D){if(!D){var D=">"}var B=" ";for(var A in E){if(E[A]!=null){var F=E[A].toString()}else{var F=""}if(A=="Class"){A="class"}if(F.indexOf("'")!=-1){B+=A+'="'+F+'" '}else{B+=A+"='"+F+"' "}}return"<"+C+B+D};EJS.Helpers.prototype.tag_end=function(A){return"</"+A+">"};EJS.Helpers.prototype.text_area_tag=function(A,C,B){B=B||{};B.id=B.id||A;B.name=B.name||A;C=C||"";if(B.size){B.cols=B.size.split("x")[0];B.rows=B.size.split("x")[1];delete B.size}B.cols=B.cols||50;B.rows=B.rows||4;return this.start_tag_for("textarea",B)+C+this.tag_end("textarea")};EJS.Helpers.prototype.text_tag=EJS.Helpers.prototype.text_area_tag;EJS.Helpers.prototype.text_field_tag=function(A,C,B){return this.input_field_tag(A,C,"text",B)};EJS.Helpers.prototype.url_for=function(A){return'window.location="'+A+'";'};EJS.Helpers.prototype.img_tag=function(B,C,A){A=A||{};A.src=B;A.alt=C;return this.single_tag_for("img",A)}