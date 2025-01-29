import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SignupForm from './SignupForm';

// URL.createObjectURLのモック
global.URL.createObjectURL = vi.fn();

const renderSignupForm = () => {
  render(
    <BrowserRouter>
      <ChakraProvider>
        <SignupForm />
      </ChakraProvider>
    </BrowserRouter>
  );
};

describe('SignupForm', () => {
  test('サインアップフォームが正しくレンダリングされる', () => {
    renderSignupForm();

    // 各入力フィールドが存在することを確認
    expect(screen.getByLabelText(/ユーザ名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/アバター/i)).toBeInTheDocument();

    // 登録ボタンが存在することを確認
    expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument();

    // ログインリンクが存在することを確認
    expect(
      screen.getByText(/すでにアカウントをお持ちですか？/i)
    ).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
  });

  test('バリデーションエラーが正しく表示される', async () => {
    renderSignupForm();

    // 登録ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: '登録' }));

    // バリデーションエラーメッセージが表示されることを確認
    expect(await screen.findByText('ユーザ名は必須です。')).toBeInTheDocument();
    expect(
      await screen.findByText('メールアドレスは必須です。')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('パスワードは必須です。')
    ).toBeInTheDocument();
  });

  test('無効なメールアドレスでエラーが表示される', async () => {
    renderSignupForm();

    // フォームに入力
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/ユーザ名/i), {
        target: { value: 'テストユーザー' },
      });
    });

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/メールアドレス/i), {
        target: { value: 'invalid-email' },
      });
    });

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/パスワード/i), {
        target: { value: 'password123' },
      });
    });

    // フォームを送信
    await waitFor(() => {
      fireEvent.submit(screen.getByRole('button', { name: '登録' }));
    });

    // エラーメッセージが表示されるのを待つ
    await waitFor(
      () => {
        expect(
          screen.getByText('有効なメールアドレスを入力してください。')
        ).toBeInTheDocument();
      },
      {
        timeout: 3000, // タイムアウトを3秒に設定
      }
    );
  });

  test('パスワードの長さが不足している場合にエラーが表示される', async () => {
    renderSignupForm();

    // 短いパスワードを入力
    fireEvent.change(screen.getByLabelText(/ユーザ名/i), {
      target: { value: 'テストユーザー' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/パスワード/i), {
      target: { value: '12345' },
    });

    // 登録ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: '登録' }));

    // エラーメッセージが表示されることを確認
    expect(
      await screen.findByText('パスワードは6文字以上である必要があります。')
    ).toBeInTheDocument();
  });

  test('アバター画像のアップロードが機能する', () => {
    renderSignupForm();

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/アバター/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files.length).toBe(1);
  });
});
