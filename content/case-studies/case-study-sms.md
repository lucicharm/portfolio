# SMS

[](https://www.evernote.com/shard/s340/res/d3621ed6-06c6-3793-3eb7-8bb29096656b)

[https://lucid.app/lucidchart/invitations/accept/inv_d517e970-b245-4b48-870a-e94f77fe4b32](https://lucid.app/lucidchart/invitations/accept/inv_d517e970-b245-4b48-870a-e94f77fe4b32)

[https://30t6sy.axshare.com/#id=b98sry&p=sms_prototype](https://30t6sy.axshare.com/#id=b98sry&p=sms_prototype)

**SUMMARY:** This epic would be the feature set to meet the requirements for substitutes to be able to accept job offers via SMS (Text messages)**.**

**PROBLEM STATEMENT:**

There are three main problems:

- Substitutes do not answer the phone calls being made by the system. Less than 5% of calls are answered.
- High Telecommunication costs to make the phone calls including long distance charges. Currently 1M+ a year spent on phone calls.
- No Communication about job details unless phone call is answered. Missed Opportunities to promote better/faster communication between the system and substitute.

**BUSINESS VALUE:**

- Text messaging has emerged as potentially a key market offering, ultimately serving as a part of the overall value proposition when considered alongside competitors' products.
- Text messaging capabilities is one of the more frequently referenced features when reviewing win/loss of new business opportunities.
- Text messaging job offers allows the substitutes to see job details without login allowing for faster and higher system fill rates improving customer retention.
- Text messaging job offers will give PowerSchool a competitive edge over Frontline for new business. Frontline currently does not offer 2-way text job offers.

**END USER VALUE:**

- Text messages are cross platform and do not require a smart phone or an internet plan or download of an additional application on the phone.
- Alerts will be received and an application does not need to be running on the phone to receive messages.
- Many districts / consortium's do not allow web or mobile job shopping. Substitutes are only allowed to receive phone calls for job offers that can be replaced with text messages.
- Substitutes will be alerted with job details that are available to them and communication improved.

**HIGH-LEVEL FEATURES OVERVIEW:**

- Proactive job offers through text messages. (Eventually replacing phone calls)
- Messages are received by the substitute from the same phone number every time
- Interactive feature settings commands (i.e. Stop,Accept,Decline,Unavailable,Unstop,Help)
- Delayed time between offers between substitutes depending on job start date and time
- Extended job visibility and acceptance windows
- Job offer text history can be kept on the substitutes phone

**SAMPLE WORKFLOW:**

- Job is created (Same as current calling method)
- Based on classification job is sent to the search rule assigned (Same as current calling method)
- Find substitute routine goes through the lists within the search rules that were prioritized by the district. (Same as current calling method)
- Substitute is found that can take the job (Same as current calling method)
- System sends text message instead of placing call (if substitute has opted-in for text job offers)
- Substitute receives text message on handset
- System receives disposition back from the carrier that the substitute received text message on device
- Timer/Wait times set based on parameter before next text message is sent for same job
- Substitute accepts job before timer expires / Substitute declines job before timer expires / Substitute does not reply before timer expires
- If not accepted before timer expiration the system moves on ( Previous substitutes offered the job and replying later still can take the job if still open)
- If job offer is accepted then message will be sent back to sub with confirmation job number if job was still available or response saying job is no longer available

**CONSIDERATIONS FOR ENGINEERING:**

- Time before job start time
- Today call-out patterns
- Future call-out patterns
- Rules before sending a text message
- Parameters for flexibility
- Contention between multiple accepts received at the same time

**HIGH-LEVEL ACCEPTANCE CRITERIA:**

- Substitute can opt-in and opt-out of 2-way SMS for job offers
- If opted-in, substitutes receive text messages for job offers instead of IVR phone calls
- The text messages for job offers give enough information that a substitute can make a decision without anything else
- The substitute can accept or decline the job offer via text message
- the substitute receives a text back confirming the accept or decline
- Substitute only receives job number if job is assigned to them
- All downstream effects work the same as if the substitute received a phone call
- The search rule and order is honored just like it is with IVR
- A startup level parameter allows for districts to opt-out, in case they make a request
- SMS is added to all IVR reporting (phone call monitor, sub statistics, etc.)

**PERFORMANCE TEST STRATEGY:**

- Load Testing

Newly developed features require performance testing which may need to be added to the current suite in Test development