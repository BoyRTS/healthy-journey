# Clerk Member Auth Setup

Healthy Journey member registration must use phone number + password.

The Clerk `<SignUp />` and `<SignIn />` widgets render the identifier fields from the Clerk Dashboard configuration. Code alone cannot force the hosted Clerk widget to stop showing email if the Clerk instance still has email enabled as the primary identifier.

Required Clerk Dashboard settings:

- Enable phone number as a sign-up and sign-in identifier.
- Enable password authentication.
- Make email optional or disable email for member sign-up.
- Disable Google/social login for the member sign-up flow unless the project owner explicitly wants it.
- Keep session persistence enabled so signed-in members can open the app again without logging in.

Expected member flow:

- Public `/sign-up` is member-only.
- Member signs up with phone number + password.
- New member is assigned `publicMetadata.role = "member"`.
- New member completes `/onboarding/member-profile`.
- Returning signed-in member opens `/` and is redirected through `/auth/redirect` without logging in again.

Coach registration must use a separate route later and must not share public member sign-up.
