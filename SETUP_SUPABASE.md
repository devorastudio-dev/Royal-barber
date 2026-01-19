# ✅ Setup Supabase - Royal Barber

## ✨ O que foi feito

Seu projeto Next.js está configurado para salvar agendamentos no Supabase! Os agendamentos agora são salvos em um banco de dados real em vez de apenas no localStorage.

## 🚀 Próximos Passos

### 1. **Instale a dependência** (já feito se você rodou `npm install`)
```bash
npm install @supabase/supabase-js
```

### 2. **Variáveis de ambiente**
Verifique se seu `.env.local` tem:
```
NEXT_PUBLIC_SUPABASE_URL=seu_projeto_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica
```

### 3. **Execute seu projeto**
```bash
npm run dev
```

### 4. **Teste um agendamento**
- Vá para `http://localhost:3000/agendamento`
- Complete o formulário
- Os dados serão salvos no Supabase automaticamente ✅

## 📊 Como Verificar os Agendamentos no Supabase

1. Acesse seu dashboard do Supabase
2. Clique em **"SQL Editor"**
3. Execute:
```sql
SELECT * FROM appointments;
```

## 🔧 Funções Disponíveis

No arquivo `src/lib/supabase.ts`:

```typescript
// Salvar novo agendamento
saveAppointment({
  service_id, service_name, barber_id, barber_name,
  customer_name, customer_phone, appointment_date, appointment_time
})

// Buscar agendamentos de um barbeiro em uma data
getBarberAppointmentsForDate(barberId, date)

// Buscar todos os agendamentos
getAllAppointments()

// Cancelar agendamento
cancelAppointment(id)
```

## 🌐 Deploy no Vercel

Quando estiver pronto para deploy:

1. **Push seu código para GitHub**
```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

2. **Acesse Vercel.com**
   - Clique "New Project"
   - Selecione seu repositório
   - Adicione as variáveis de ambiente:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy! 🚀

## ✅ Checklist de Deploy

- [ ] Projeto com Supabase configurado
- [ ] Testou agendamento localmente
- [ ] Verificou dados no Supabase
- [ ] Fez push para GitHub
- [ ] Deploy no Vercel com variáveis de ambiente
- [ ] Testou agendamento em produção

## 📞 Suporte

Se encontrar problemas:
- Verifique as variáveis de ambiente
- Confirme que a tabela foi criada no Supabase
- Verifique o console do navegador (F12) para erros
