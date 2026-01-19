# 🚀 Guia Completo de Deploy no Vercel

## ✅ Tudo Pronto!

Seu site Royal Barber está configurado com:
- ✅ Next.js 16
- ✅ Supabase para banco de dados
- ✅ Sistema de agendamentos online
- ✅ Build otimizado

## 📋 Passo a Passo do Deploy

### **Passo 1: Verificar o GitHub**

O código já foi feito push para:
```
https://github.com/devorastudio-dev/Royal-barber.git
```

### **Passo 2: Acessar Vercel**

1. Vá para [vercel.com](https://vercel.com)
2. Clique em **"Sign in"** com GitHub
3. Autorize o Vercel a acessar seus repositórios

### **Passo 3: Criar Novo Project**

1. Clique em **"Add New..."** → **"Project"**
2. Selecione **"Royal-barber"** da sua lista
3. Clique em **"Import"**

### **Passo 4: Configurar Variáveis de Ambiente**

Na tela de configuração, procure por **"Environment Variables"**:

**Nome:** `NEXT_PUBLIC_SUPABASE_URL`
**Valor:** `https://obssszoxtomcdbafluhz.supabase.co`

**Nome:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
**Valor:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ic3Nzem94dG9tY2RiYWZsdWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDg1NTcsImV4cCI6MjA4NDMyNDU1N30.Hq6ekbX2j2TVF6tQRJThuaiQCnSrPLZEX5ig85V4r6Y`

### **Passo 5: Deploy**

Clique em **"Deploy"** e aguarde (leva ~3-5 minutos)

## ✨ Resultado

Após o deploy, você terá:

```
https://royal-barber.vercel.app/ (ou seu domínio customizado)
```

## 🌐 Domínio Customizado (Opcional)

Para usar seu próprio domínio (ex: `www.seusite.com`):

1. No Vercel: **Settings** → **Domains**
2. Adicione seu domínio
3. Copie os registros DNS
4. Adicione no seu registrador (GoDaddy, Namecheap, etc)

## 📊 Monitorar Agendamentos

**No Supabase Dashboard:**
1. Acesse [supabase.com](https://supabase.com)
2. Entre em seu projeto
3. **SQL Editor** → Digite:
```sql
SELECT * FROM appointments ORDER BY created_at DESC;
```

## 🔄 Deploy Automático

Agora, toda vez que você fizer push para `main`:
```bash
git push origin main
```

O Vercel faz deploy automaticamente! ✅

## 📱 Testando em Produção

1. Acesse sua URL do Vercel
2. Vá para `/agendamento`
3. Complete um agendamento
4. Verifique se aparece no Supabase

## 🆘 Troubleshooting

### Erro 503 - Service Unavailable
- Aguarde o deploy terminar
- Recarregue a página em 5 minutos

### Agendamentos não salvam
- Verifique as variáveis de ambiente no Vercel
- Confirme as chaves no `.env.local` localmente

### Erro de SSL
- Aguarde até 24h para propagação de DNS

## 📞 Contato Vercel Support
- Site: [vercel.com/support](https://vercel.com/support)
- Email: support@vercel.com

---

## 🎉 Parabéns!

Seu site Royal Barber está online e pronto para receber clientes! 🚀
