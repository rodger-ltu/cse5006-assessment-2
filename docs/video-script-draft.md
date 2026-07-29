# TONDAW assessment video — four recording sections



## Section 1 — Introduction, purpose and design direction


Hi, I'm Rodger Herbert, and my student number is 22838962.

This the a video to introduce, demonstrate and explain my cloud based web application in its current state
.
 i want to come up with a working name for the project and without any client feedback i decided to use the first and last 3 letters of the self proclaimed best lecturer in the worlds name to create the acronym

  Timely Online Notices — Distributed Announcement Web.
 
  
 The application is called TON-DAW, pronounced “Tondor”.

The names and labels are working design choices / placeholder. In a real client project I would show this prototype to the client, get feedback, and revise/replace those names.


🔴 **ACTION:**  share the browser showing Home.

The written brief calls this an RSS-to-LMS project.

a workshop clarified the idea further: saying thaty notices from different subjects and university services should be brought into one place.

this is merely the frontend with sample articfacts. The real RSS server and API belong in the later stages.

I looked at several RSS readers before starting. Some looked like email and some were extremely plain and bland.

 I preferred Inoreader's clean layout and side navigation, but the assignment examples focused on a top navbar.
 
 Rather than arbitrarily choosing one, I made both available as a saved preference. and used the hamburger menu as per the lms as in appears when the page reaches a certain threshold. 

ill demonstrate the menu settings and hamburger menu now.



Stop recording Section 1.










## Section 2 — How the interface works

First visit: Welcome screen explains TONDAW;
 Start using TONDAW dismisses it, and that choice is remembered.

Current subject: Large central panel for important internal/current-subject announcements—more detail and an explicit Read more link.
Other subjects and services: Compact “Hey, did you hear about this?” discovery list for potentially useful external notices.

Clickable titles: Only the compact discovery list uses titles as links because repeated Read more links would clutter that small panel.
View all: Each panel opens the appropriate filtered feed.

Standard feed: Once inside Feeds, every notice uses the same full card layout with Read more and Back controls.

Design reason: Different Home presentations reflect different importance and purpose; the full feed becomes consistent once the user chooses to explore them.

About page gives some details

Settings page tour...

 Stop recording Section 2.













## Section 3 — Code and component architecture

### 1. `app/layout.tsx`

> I’ll briefly follow the code path that turns the shared application layout into announcement cards. This root layout wraps every page in the preferences provider and SiteLayout. The `children` value represents the page currently being displayed.

### 2. `SiteLayout.tsx`

> SiteLayout creates the shared interface from the reusable Header, Navigation and Footer components. This children position is where the current page is inserted.

### 3. `app/page.tsx`

> On the Home page, the announcement array is imported from the separate data file. `find` selects the current-subject notice, while `filter` collects notices tagged as other subjects. Those results are passed into reusable Home components.

### 4. `AnnouncementFeed.tsx`

> On the Feeds page, AnnouncementFeed maps over the selected records and creates one reusable AnnouncementCard for each one. Each announcement has a slug that identifies it and forms part of the address for its dynamic detail page.

Finish:

> Separating the layout, data and reusable components means Assessment 2 can replace the sample array with RSS or API data without rebuilding the frontend.



## Section 4 — Design justification, GitHub workflow and project continuity

🔴 **ACTION:** Show the application Home page.

> To finish, the main usability decision was to separate important current-subject announcements from the more compact list of potentially useful notices from other subjects and services. This makes the interface easier to scan without presenting every announcement with the same level of detail.

> Providing both Top and Side navigation was also a deliberate design choice. The assignment examples emphasised a top navigation bar, while Inoreader inspired the side layout. Saving that preference gives the user control without requiring two separate interfaces.

🔴 **ACTION:** Show the terminal and run:

```powershell
git log --oneline --decorate --all
```

> This command shows the complete commit history across all branches. The project was developed incrementally, with descriptive commits and feature branches for major work including announcement details, themes, responsive navigation, accessibility and finalisation. The branches and commits were pushed to GitHub, while `node_modules` was excluded from the repository.

🔴 **ACTION:** Return to the application.

> Assessment 1 uses fictional TypeScript data, but the layout and reusable components provide continuity into Assessment 2. The sample array can later be replaced by live RSS or API data without rebuilding the frontend.

> That concludes my demonstration of TONDAW. Thank you.
