# Setup Supabase - Royal Barber


##  Como Verificar os Agendamentos no Supabase

1. Acesse seu dashboard do Supabase
2. Clique em **"SQL Editor"**
3. Execute:
```sql
SELECT * FROM appointments;
```

##  Funções Disponíveis

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
