import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../services/api';

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
  exam: '#ff4d4d',  // Kırmızı
  meeting: '#4da6ff', // Mavi
  other: '#47d147'   // Yeşil
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
    try {
      const response = await addEvent(newEvent);
      setEvents([...events, { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) }]);
      handleCloseModal();
    } catch (error) {
      console.error('Etkinlik eklenirken hata:', error);
    }
  };

  const handleUpdateEvent = async () => {
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
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        views={['month', 'agenda']} // Ay ve ajanda görünümlerini ekle
        defaultView="month"
        messages={{
          next: "İleri",
          previous: "Geri",
          today: "Bugün",
          month: "Ay",
          agenda: "Ajanda",
          date: "Tarih",
          event: "Etkinlik",
          time: "Saat",
          noEventsInRange: "Bu aralıkta etkinlik yok",
          allDay: "Tüm gün",
          showMore: total => `+${total} etkinlik daha`
        }}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Etkinliği Düzenle' : 'Yeni Etkinlik'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tür</Form.Label>
              <Form.Select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <option value="other">Diğer</option>
                <option value="exam">Sınav</option>
                <option value="meeting">Toplantı</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Başlangıç</Form.Label>
              <Form.Control
                type="datetime-local"
                value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bitiş</Form.Label>
              <Form.Control
                type="datetime-local"
                value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            İptal
          </Button>
          {selectedEvent ? (
            <>
              <Button variant="danger" onClick={handleDeleteEvent}>
                Sil
              </Button>
              <Button variant="primary" onClick={handleUpdateEvent}>
                Güncelle
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleAddEvent}>
              Ekle
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Calendar;
