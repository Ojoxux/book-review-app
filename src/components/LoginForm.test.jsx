import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("ログインフォームが正しくレンダリングされる", () => {
  render(<LoginForm />);

  // メールアドレスの入力フィールドが存在することを確認
  const emailInput = screen.getByLabelText(/メールアドレス/i);
  expect(emailInput).toBeInTheDocument();

  // パスワードの入力フィールドが存在することを確認
  const passwordInput = screen.getByLabelText(/パスワード/i);
  expect(passwordInput).toBeInTheDocument();

  // ログインボタンが存在することを確認
  const loginButton = screen.getByRole("button", { name: "ログイン" });
  expect(loginButton).toBeInTheDocument();
});
