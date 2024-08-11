import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/clerk-react";

export const Auth = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100vh] border-2 ">
      <div className="text-center">
        <SignedOut className="text-center">
          <SignUpButton
            className="m-10 bg-cyan-200 p-2 border-none text-lg"
            mode="modal"
          />
          <SignInButton
            className=" bg-cyan-200 p-2 border-none text-lg"
            mode="modal"
          />
        </SignedOut>
        <SignedIn>
          <UserButton />
          {/* main page */}
        </SignedIn>
      </div>
    </div>
  );
};
