using System.Threading.Tasks;
using Scheduler.Service.Entities;
using Common.Repositories;

using Microsoft.AspNetCore.Mvc;
using Scheduler.Service.src;
using System;
using System.Linq;
using System.Collections.Generic;
using MassTransit.Initializers;


namespace Scheduler.Service.src.Controllers
{
    [ApiController]
    [Route("appointments")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IRepository<Appointment> appointmentsRepository;
        private readonly IRepository<UserAppointment> userAppointmentsRepository;

        public AppointmentsController(IRepository<Appointment> appointmentsRepository, IRepository<UserAppointment> userAppointmentsRepository)
        {
            this.appointmentsRepository = appointmentsRepository;
            this.userAppointmentsRepository = userAppointmentsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AppointmentDto>> GetAllAsync()
        {
            var appointments = (await appointmentsRepository.GetAllAsync()).Select(appointment => appointment.AsDto());
            return appointments;
        }

        // [HttpGet("get/{userId}")]
        // public async Task<ActionResult<IEnumerable<UserAppointmentDto>>> GetByUserIDAsync(Guid userId)//get pentru appointment urile unui doctor
        // {
        //     var appointments = await appointmentsRepository.GetAllAsync();
        //     var appointmentsOfUser = await userAppointmentsRepository.GetAllAsync(userAppointment => userAppointment.UserId == userId);
        //     if (appointmentsOfUser.Any())
        //     {
        //         var appointmentsToSend = appointmentsOfUser.Select(binder =>
        //         {
        //             var tmpAppointment = appointments.SingleOrDefault(appointment => appointment.Id == binder.AppointmentId);
        //             if (tmpAppointment != null)
        //             {
        //                 return binder.UserAppointmentAsDto(tmpAppointment.Name);
        //             }
        //             else
        //                 return null;
        //         }).Where(dto => dto != null);
        //         return Ok(appointmentsToSend);
        //     }
        //     return BadRequest();
        // }
        [HttpGet("/get/{userId}")]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetByUserIDAsync(Guid userId) 
        {
            var appointments = (await appointmentsRepository.GetAllAsync(appointment => 
                appointment.DoctorId == userId || appointment.UserId == userId
            )).Select(appointment => appointment.AsDto());

            if (appointments.Any()) 
            {
                return Ok(appointments); 
            }

            return NotFound(); 
        }

        [HttpGet("/getappointment/{userId}")]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetByAppointmentIDAsync(Guid appointmentID) 
        {
            var appointments = (await appointmentsRepository.GetAllAsync(appointment => 
                appointment.Id == appointmentID
            )).Select(appointment => appointment.AsDto());

            if (appointments.Any()) 
            {
                return Ok(appointments); 
            }

            return NotFound(); // Return NotFound (404) if no appointments are found for the user
        }

        [HttpGet("getpacient/{userId}")]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetByPacientUserIDAsync(Guid userId)//get pentru appointment urile unui pacient
        {
            var appointments = await appointmentsRepository.GetAllAsync(Appointment => Appointment.UserId == userId);
            //var appointmentsOfUser = await userAppointmentsRepository.GetAllAsync(userAppointment => userAppointment.UserId == userId);
            if (appointments.Any())
            {
                var appointmentsToSend = appointments.Where(dto => dto != null);
                return Ok(appointmentsToSend);
            }
            return BadRequest();
        }

        [HttpPost("set")]
        public async Task<ActionResult<AppointmentDto>> PostAppointmentsAsync(CreateAppointmentDto createAppointmentDto)
        {
            var appointment = new Appointment
            {
                UserId = createAppointmentDto.UserId,
                Name = createAppointmentDto.Type,
                StartTime = createAppointmentDto.StartTime,
                EndTime = createAppointmentDto.EndTime,
                Type = createAppointmentDto.Type,
                DoctorId = createAppointmentDto.DoctorId,
                Status = createAppointmentDto.Status
            };
            await appointmentsRepository.CreateAsync(appointment);
            return CreatedAtAction(nameof(PostAppointmentsAsync), new
            {
                id = appointment.Id
            });
        }

        [HttpPut("/put/{id}")]
        public async Task<IActionResult> PutAsync(Guid id, UpdateAppointmentDto updatedAppointmentDto)
        {
            var updatedAppointment = await appointmentsRepository.GetAsync(id);
            if (updatedAppointment == null) return NotFound();

            updatedAppointment.StartTime = updatedAppointmentDto.StartTime;
            updatedAppointment.EndTime = updatedAppointmentDto.EndTime;
            updatedAppointment.Status = updatedAppointmentDto.Status;

            await appointmentsRepository.UpdateAsync(updatedAppointment);

            return NoContent();
        }
        // [HttpPost("setuser")]
        // public async Task<ActionResult<UserAppointmentDto>> PostAppointmentsUserAsync(CreateUserAppointmentDto createAppointmentDto) //creaza un userAppointment
        // {
        //     var existingAppointment = await userAppointmentsRepository.GetAllAsync(appointment => appointment.AppointmentId == createAppointmentDto.AppointmentId && appointment.UserId == createAppointmentDto.UserId);
        //     if (existingAppointment.Any()) return BadRequest();

        //     var appointment = new UserAppointment
        //     {
        //         UserId = createAppointmentDto.UserId,
        //         AppointmentId = createAppointmentDto.AppointmentId
        //     };
        //     await userAppointmentsRepository.CreateAsync(appointment);
        //     return CreatedAtAction(nameof(PostAppointmentsUserAsync), new
        //     {
        //         id = appointment.Id
        //     });
        // }
        // [HttpPost("set")] // Keep the same endpoint as your original "set" method
        // public async Task<ActionResult<UserAppointmentDto>> PostAppointmentAndUserAppointmentAsync(CreateAppointmentDto createAppointmentDto, Guid userId) 
        // {
        //     // 1. Create the Appointment (mostly unchanged from your existing method)
        //     var existingAppointment = await appointmentsRepository.GetAllAsync(appointment => appointment.Name == createAppointmentDto.Name);
        //     if (existingAppointment.Any()) return BadRequest();

        //     var appointment = new Appointment
        //     {
        //         UserId = createAppointmentDto.UserId,
        //         Name = createAppointmentDto.Type,
        //         StartTime = createAppointmentDto.StartTime,
        //         EndTime = createAppointmentDto.EndTime,
        //         Type = createAppointmentDto.Type
        //     };
            
        //     await appointmentsRepository.CreateAsync(appointment); // Save to get the generated Id

        //     // 2. Create the UserAppointment
        //     var existingUserAppointment = await userAppointmentsRepository.GetAllAsync(appointment => appointment.AppointmentId == appointment.Id && appointment.UserId == userId);
        //     if (existingUserAppointment.Any()) return BadRequest();

        //     var userAppointment = new UserAppointment
        //     {
        //         UserId = userId, // Use the userId parameter directly
        //         AppointmentId = appointment.Id // Set the AppointmentId now that we have it
        //     };

        //     await userAppointmentsRepository.CreateAsync(userAppointment);

        //     // 3. Return a result (adjust as needed)
        //     return CreatedAtAction(nameof(PostAppointmentAndUserAppointmentAsync), new { id = userAppointment.Id });
        // }



        // [HttpPost("set")] // Keep the same endpoint as your original "set" method
        // public async Task<ActionResult<UserAppointmentDto>> PostAppointmentAndUserAppointmentAsync([FromBody] Guid pacientId,[FromBody] DateTime StartTime,[FromBody] DateTime EndTime,[FromBody] String Type,[FromBody] Guid doctorId) 
        // {
        //     // // 1. Create the Appointment (mostly unchanged from your existing method)
        //     // var existingAppointment = await appointmentsRepository.GetAllAsync(appointment => appointment.Name == Type);
        //     // if (existingAppointment.Any()) return BadRequest();

        //     var appointment = new Appointment
        //     {
        //         UserId = pacientId,
        //         Name = Type,
        //         StartTime = StartTime,
        //         EndTime = EndTime,
        //         Type = Type
        //     };
            
        //     await appointmentsRepository.CreateAsync(appointment); // Save to get the generated Id

        //     // // 2. Create the UserAppointment
        //     // var existingUserAppointment = await userAppointmentsRepository.GetAllAsync(appointment => appointment.AppointmentId == appointment.Id && appointment.UserId == doctorId);
        //     // if (existingUserAppointment.Any()) return BadRequest();

        //     var userAppointment = new UserAppointment
        //     {
        //         UserId = doctorId, // Use the userId parameter directly
        //         AppointmentId = appointment.Id // Set the AppointmentId now that we have it
        //     };

        //     await userAppointmentsRepository.CreateAsync(userAppointment);

        //     // 3. Return a result (adjust as needed)
        //     return CreatedAtAction(nameof(PostAppointmentAndUserAppointmentAsync), new { id = userAppointment.Id });
        // }
    }
}