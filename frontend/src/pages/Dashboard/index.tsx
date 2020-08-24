import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const [selectDate, SetSelectDate] = useState(new Date());
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="gobarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Wellcome</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Schedules</h1>
          <p>
            <span>Today</span>
            <span>Day 6</span>
            <span>Monday</span>
          </p>
          <NextAppointment>
            <strong>Next appointment</strong>

            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/53009976?s=460&u=274139a7a8e844d7308622c898361bb30f1850fb&v=4"
                alt="goa"
              />
              <strong>Guilherme</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>
            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/53009976?s=460&u=274139a7a8e844d7308622c898361bb30f1850fb&v=4"
                  alt="goa"
                />
                <strong>Guilherme</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/53009976?s=460&u=274139a7a8e844d7308622c898361bb30f1850fb&v=4"
                  alt="goa"
                />
                <strong>Guilherme</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
