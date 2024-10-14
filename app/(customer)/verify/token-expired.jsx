"use client";

export default function TokenExpired() {
  return (
    <div>
      <h1>Invalid or Expired Token</h1>
      <p>
        Either you have already used this token to verify or the token has been
        expired. The token only lasts for 5 minutes
      </p>
    </div>
  );
}
