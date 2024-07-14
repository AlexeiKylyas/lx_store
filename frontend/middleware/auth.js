export default function ({ store, redirect }) {
  // Если пользователь не авторизован
  if (!store.state.auth.loggedIn) {
    return redirect('admin/login')
  }
}
