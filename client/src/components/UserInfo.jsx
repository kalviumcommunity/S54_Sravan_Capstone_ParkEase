import { useUser } from "@clerk/clerk-react";

export default function User() {
  const { isSignedIn, user, isLoaded } = useUser();
    console.log(user.primaryEmailAddress.emailAddress)
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <div>Hello {user.fullName}!</div>;
  }

  return <div>Not signed in</div>;
}