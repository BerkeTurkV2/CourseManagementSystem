import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../../services/api';

const locales = {
  'tr': tr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventTypeColors = {
  exam: '#074297',  
  meeting: '#06377e', 
  other: '#052c65'   
};

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'other',
    description: '',
    start: new Date(),
    end: new Date()
  });

  // Kullanıcı rolünü localStorage'dan al
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      })));
    } catch (error) {
      console.error('Etkinlikler yüklenirken hata:', error);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    // Sadece admin kullanıcılar için etkinlik ekleme modalını aç
    if (!isAdmin) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
      alert('Geçmiş tarihlere etkinlik eklenemez!');
      return;
    }
    
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      type: 'other',
      description: '',
      start,
      end
    });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    // Sadece admin kullanıcılar için etkinlik düzenleme modalını aç
    if (!isAdmin) return;

    setSelectedEvent(event);
    setNewEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      type: 'other',
      description: '',
      start: new Date(),
      end: new Date()
    });
  };

  const handleAddEvent = async () => {
    if (!isAdmin) return;

    try {
      const response = await addEvent(newEvent);
      setEvents([...events, { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) }]);
      handleCloseModal();
    } catch (error) {
      console.error('Etkinlik eklenirken hata:', error);
    }
  };

  const handleUpdateEvent = async () => {
    if (!isAdmin) return;

    try {
      await updateEvent(selectedEvent.id, newEvent);
      setEvents(events.map(event => 
        event.id === selectedEvent.id 
          ? { ...newEvent, id: selectedEvent.id }
          : event
      ));
      handleCloseModal();
    } catch (error) {
      console.error('Etkinlik güncellenirken hata:', error);
    }
  };

  const handleDeleteEvent = async () => {
    if (!isAdmin) return;

    try {
      await deleteEvent(selectedEvent.id);
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      handleCloseModal();
    } catch (error) {
      console.error('Etkinlik silinirken hata:', error);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: eventTypeColors[event.type] || '#3174ad'
      }
    };
  };

  return (
    <div className="container-fluid px-4 text-white min-vh-100">
      <div className="card bg-dark text-white border-1 shadow p-4">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 140px)' }}
          selectable={isAdmin} // Sadece admin için seçilebilir yap
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          views={['month', 'agenda']}
          defaultView="month"
          messages={{
            next: "Gelecek Ay",
            previous: "Geçen Ay",
            today: "Bugün",
            month: "Takvim",
            agenda: "Ajanda",
            date: "Tarih",
            event: "Etkinlik",
            time: "Saat",
            noEventsInRange: "Bu aralıkta etkinlik yok",
            allDay: "Tüm gün",
            showMore: total => `+${total} etkinlik daha`
          }}
        />

        {isAdmin && showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog mt-4">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedEvent ? 'Etkinliği Düzenle' : 'Yeni Etkinlik'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Başlık</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type" className="form-label">Tür</label>
                      <select
                        className="form-select"
                        id="type"
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      >
                        <option value="other">Diğer</option>
                        <option value="exam">Sınav</option>
                        <option value="meeting">Konferans</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Açıklama</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="start" className="form-label">Başlangıç</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="start"
                        value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="end" className="form-label">Bitiş</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="end"
                        value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    İptal
                  </button>
                  {selectedEvent ? (
                    <>
                      <button type="button" className="btn btn-danger" onClick={handleDeleteEvent}>
                        Sil
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleUpdateEvent}>
                        Güncelle
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-primary" onClick={handleAddEvent}>
                      Ekle
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isAdmin && showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
}

export default Calendar;
