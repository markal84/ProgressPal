export default function Notification({ message }) {
  if (message === null) {
    return null
  }

  return <div>{message}</div>
}
