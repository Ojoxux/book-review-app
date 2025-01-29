import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const renderLoginForm = () => {
  render(
    <BrowserRouter>
      <ChakraProvider>
        <LoginForm />
      </ChakraProvider>
    </BrowserRouter>
  );
};

describe('LoginForm', () => {
  test('ログインフォームが正しくレンダリングされる', () => {
    renderLoginForm();

    // メールアドレスの入力フィールドが存在することを確認
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();

    // パスワードの入力フィールドが存在することを確認
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();

    // ログインボタンが存在することを確認
    expect(
      screen.getByRole('button', { name: 'ログイン' })
    ).toBeInTheDocument();

    // サインアップリンクが存在することを確認
    expect(
      screen.getByText(/アカウントをお持ちでないですか？/i)
    ).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
  });

  test('空のフィールドでエラーが表示される', async () => {
    renderLoginForm();

    // ログインボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    // エラーメッセージが表示されることを確認
    expect(
      screen.getByText('メールアドレスとパスワードを入力してください。')
    ).toBeInTheDocument();
  });

  test('無効なメールアドレスでエラーが表示される', async () => {
    renderLoginForm();

    // 無効なメールアドレスを入力
    fireEvent.change(screen.getByLabelText(/メールアドレス/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText(/パスワード/i), {
      target: { value: 'password123' },
    });

    // ログインボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    // エラーメッセージが表示されることを確認
    expect(
      screen.getByText('有効なメールアドレスを入力してください。')
    ).toBeInTheDocument();
  });

  test('有効な入力でエラーが表示されない', async () => {
    renderLoginForm();

    // 有効な入力を設定
    fireEvent.change(screen.getByLabelText(/メールアドレス/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/パスワード/i), {
      target: { value: 'password123' },
    });

    // ログインボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    // エラーメッセージが表示されないことを確認
    expect(
      screen.queryByText('メールアドレスとパスワードを入力してください。')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('有効なメールアドレスを入力してください。')
    ).not.toBeInTheDocument();
  });

  test('パスワードの表示/非表示が切り替わる', () => {
    renderLoginForm();

    // パスワードフィールドが最初は非表示
    const passwordInput = screen.getByLabelText(/パスワード/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    // 表示ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: '表示' }));
    expect(passwordInput).toHaveAttribute('type', 'text');

    // 非表示ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: '隠す' }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
